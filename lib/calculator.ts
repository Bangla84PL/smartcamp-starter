import { LLMModel, GPUSpec, VPSOption, QuantizationType, LLM_MODELS, GPU_SPECS, VPS_OPTIONS } from './data/models';

export interface CalculatorInput {
  modelId: string;
  quantization: QuantizationType;
  targetTokensPerSecond: number;
  budgetUSD: number;
}

export interface CalculatorResult {
  model: LLMModel;
  quantization: QuantizationType;
  requirements: {
    ramGB: number;
    vramGB: number;
  };
  recommendedGPUs: Array<{
    gpu: GPUSpec;
    estimatedTokensPerSecond: number;
    withinBudget: boolean;
  }>;
  vpsOptions: Array<{
    vps: VPSOption;
    estimatedTokensPerSecond: number;
    withinBudget: boolean;
  }>;
  summary: {
    cheapestLocalOption: number;
    cheapestVPSOption: number;
    recommendation: string;
  };
}

export function calculateHardwareRequirements(input: CalculatorInput): CalculatorResult {
  const model = LLM_MODELS.find(m => m.id === input.modelId);
  if (!model) {
    throw new Error(`Model ${input.modelId} not found`);
  }

  // Get memory requirements based on quantization
  const ramGB = getMemoryRequirement(model, input.quantization, 'ram');
  const vramGB = getMemoryRequirement(model, input.quantization, 'vram');

  // Calculate GPU recommendations
  const recommendedGPUs = GPU_SPECS
    .filter(gpu => gpu.vramGB >= vramGB) // Filter GPUs with enough VRAM
    .map(gpu => ({
      gpu,
      estimatedTokensPerSecond: calculateTokensPerSecond(gpu, model, input.quantization),
      withinBudget: gpu.priceUSD <= input.budgetUSD,
    }))
    .sort((a, b) => {
      // Sort by: budget compliance first, then performance, then price
      if (a.withinBudget !== b.withinBudget) {
        return a.withinBudget ? -1 : 1;
      }
      if (Math.abs(a.estimatedTokensPerSecond - input.targetTokensPerSecond) !== 
          Math.abs(b.estimatedTokensPerSecond - input.targetTokensPerSecond)) {
        return Math.abs(a.estimatedTokensPerSecond - input.targetTokensPerSecond) - 
               Math.abs(b.estimatedTokensPerSecond - input.targetTokensPerSecond);
      }
      return a.gpu.priceUSD - b.gpu.priceUSD;
    })
    .slice(0, 5); // Top 5 recommendations

  // Calculate VPS options
  const vpsOptions = VPS_OPTIONS
    .filter(vps => vps.vramGB >= vramGB)
    .map(vps => ({
      vps,
      estimatedTokensPerSecond: calculateVPSTokensPerSecond(vps, model, input.quantization),
      withinBudget: vps.monthlyCostUSD <= input.budgetUSD,
    }))
    .sort((a, b) => {
      if (a.withinBudget !== b.withinBudget) {
        return a.withinBudget ? -1 : 1;
      }
      return a.vps.monthlyCostUSD - b.vps.monthlyCostUSD;
    });

  // Calculate summary
  const cheapestLocalOption = recommendedGPUs.length > 0 ? 
    Math.min(...recommendedGPUs.map(r => r.gpu.priceUSD)) : 
    Infinity;
  
  const cheapestVPSOption = vpsOptions.length > 0 ? 
    Math.min(...vpsOptions.map(r => r.vps.monthlyCostUSD)) : 
    Infinity;

  const recommendation = generateRecommendation(
    input, 
    recommendedGPUs, 
    vpsOptions, 
    cheapestLocalOption, 
    cheapestVPSOption
  );

  return {
    model,
    quantization: input.quantization,
    requirements: { ramGB, vramGB },
    recommendedGPUs,
    vpsOptions,
    summary: {
      cheapestLocalOption,
      cheapestVPSOption,
      recommendation,
    },
  };
}

function getMemoryRequirement(model: LLMModel, quantization: QuantizationType, type: 'ram' | 'vram'): number {
  // Map new quantization types to legacy ones for memory calculation
  const legacyQuantization = mapToLegacyQuantization(quantization);
  const suffix = type === 'ram' ? 'MemoryGB' : 'VRAMGB';
  
  switch (legacyQuantization) {
    case 'Q4':
      return model[`base${suffix}Q4` as keyof LLMModel] as number;
    case 'Q8':
      return model[`base${suffix}Q8` as keyof LLMModel] as number;
    case 'FP16':
      return model[`base${suffix}FP16` as keyof LLMModel] as number;
    default:
      throw new Error(`Unknown quantization: ${quantization}`);
  }
}

function mapToLegacyQuantization(quantization: QuantizationType): 'Q4' | 'Q8' | 'FP16' {
  switch (quantization) {
    case 'Q2_K':
      return 'Q4'; // Q2_K uses similar memory to Q4 but lower quality
    case 'Q4_0':
    case 'Q4_K_M':
      return 'Q4';
    case 'Q5_K_M':
    case 'Q8_0':
      return 'Q8';
    case 'FP16':
      return 'FP16';
    case 'FP32':
      return 'FP16'; // FP32 uses roughly 2x FP16, but we approximate
    default:
      return 'Q4';
  }
}

function calculateTokensPerSecond(gpu: GPUSpec, model: LLMModel, quantization: QuantizationType): number {
  // Simple performance estimation based on GPU performance score and model size
  const basePerformance = gpu.performanceScore;
  const modelSizeMultiplier = getModelSizeMultiplier(model);
  const quantizationMultiplier = getQuantizationMultiplier(quantization);
  
  return Math.round(basePerformance * modelSizeMultiplier * quantizationMultiplier / 10);
}

function calculateVPSTokensPerSecond(vps: VPSOption, model: LLMModel, quantization: QuantizationType): number {
  // Similar calculation for VPS
  const basePerformance = vps.performanceScore;
  const modelSizeMultiplier = getModelSizeMultiplier(model);
  const quantizationMultiplier = getQuantizationMultiplier(quantization);
  
  return Math.round(basePerformance * modelSizeMultiplier * quantizationMultiplier / 10);
}

function getModelSizeMultiplier(model: LLMModel): number {
  // Smaller models run faster - updated for more model sizes
  switch (model.parameterCount) {
    case '3.8B': return 1.3;
    case '7B': return 1.0;
    case '8B': return 0.9;
    case '13B': return 0.7;
    case '33B':
    case '34B': return 0.4;
    case '47B': return 0.35; // Mixtral 8x7B
    case '70B':
    case '72B': return 0.2;
    case '123B': return 0.1; // Mistral Large
    default: return 0.5;
  }
}

function getQuantizationMultiplier(quantization: QuantizationType): number {
  // Lower precision runs faster - realistic multipliers for new quantization types
  switch (quantization) {
    case 'Q2_K': return 1.5; // Fastest but lowest quality
    case 'Q4_0': return 1.3; // Legacy Q4
    case 'Q4_K_M': return 1.2; // Modern Q4, slightly slower but better quality
    case 'Q5_K_M': return 1.1; // Between Q4 and Q8
    case 'Q8_0': return 1.0; // Baseline
    case 'FP16': return 0.8; // Slower but high quality
    case 'FP32': return 0.6; // Slowest, research quality
    default: return 1.0;
  }
}

function generateRecommendation(
  input: CalculatorInput,
  gpus: Array<{gpu: GPUSpec; estimatedTokensPerSecond: number; withinBudget: boolean}>,
  vps: Array<{vps: VPSOption; estimatedTokensPerSecond: number; withinBudget: boolean}>,
  cheapestLocal: number,
  cheapestVPS: number
): string {
  const monthsToBreakEven = cheapestLocal / cheapestVPS;
  
  if (gpus.length === 0 && vps.length === 0) {
    return "No suitable hardware found for this configuration. Consider a smaller model or higher budget.";
  }
  
  if (gpus.length === 0) {
    return "Consider VPS options as local hardware requirements exceed available options.";
  }
  
  if (vps.length === 0) {
    return "Local hardware is your only option for this configuration.";
  }
  
  if (monthsToBreakEven <= 12) {
    return `Buy local hardware - pays for itself in ${Math.round(monthsToBreakEven)} months vs VPS costs.`;
  } else {
    return `Consider VPS for flexibility - local hardware takes ${Math.round(monthsToBreakEven)} months to pay off.`;
  }
}