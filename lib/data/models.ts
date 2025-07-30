export interface LLMModel {
  id: string;
  name: string;
  parameterCount: string;
  baseMemoryGBQ4: number;
  baseMemoryGBQ8: number;
  baseMemoryGBFP16: number;
  baseVRAMGBQ4: number;
  baseVRAMGBQ8: number;
  baseVRAMGBFP16: number;
}

export interface GPUSpec {
  id: string;
  name: string;
  vramGB: number;
  memoryBandwidth: number; // GB/s
  performanceScore: number; // relative performance for LLM inference
  priceUSD: number;
  powerConsumption: number; // watts
}

export interface VPSOption {
  id: string;
  provider: string;
  name: string;
  vramGB: number;
  monthlyCostUSD: number;
  performanceScore: number;
}

export const LLM_MODELS: LLMModel[] = [
  {
    id: "llama-7b",
    name: "Llama 2 7B",
    parameterCount: "7B",
    baseMemoryGBQ4: 8,
    baseMemoryGBQ8: 14,
    baseMemoryGBFP16: 28,
    baseVRAMGBQ4: 6,
    baseVRAMGBQ8: 10,
    baseVRAMGBFP16: 20,
  },
  {
    id: "llama-13b",
    name: "Llama 2 13B", 
    parameterCount: "13B",
    baseMemoryGBQ4: 16,
    baseMemoryGBQ8: 26,
    baseMemoryGBFP16: 52,
    baseVRAMGBQ4: 12,
    baseVRAMGBQ8: 18,
    baseVRAMGBFP16: 36,
  },
  {
    id: "llama-70b",
    name: "Llama 2 70B",
    parameterCount: "70B", 
    baseMemoryGBQ4: 80,
    baseMemoryGBQ8: 140,
    baseMemoryGBFP16: 280,
    baseVRAMGBQ4: 60,
    baseVRAMGBQ8: 100,
    baseVRAMGBFP16: 200,
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    parameterCount: "7B",
    baseMemoryGBQ4: 8,
    baseMemoryGBQ8: 14,
    baseMemoryGBFP16: 28,
    baseVRAMGBQ4: 6,
    baseVRAMGBQ8: 10,
    baseVRAMGBFP16: 20,
  },
  {
    id: "codellama-34b",
    name: "CodeLlama 34B",
    parameterCount: "34B",
    baseMemoryGBQ4: 40,
    baseMemoryGBQ8: 68,
    baseMemoryGBFP16: 136,
    baseVRAMGBQ4: 30,
    baseVRAMGBQ8: 50,
    baseVRAMGBFP16: 100,
  },
];

export const GPU_SPECS: GPUSpec[] = [
  {
    id: "rtx-4060-ti",
    name: "RTX 4060 Ti 16GB",
    vramGB: 16,
    memoryBandwidth: 288,
    performanceScore: 75,
    priceUSD: 499,
    powerConsumption: 165,
  },
  {
    id: "rtx-4070",
    name: "RTX 4070 12GB",
    vramGB: 12,
    memoryBandwidth: 504,
    performanceScore: 85,
    priceUSD: 599,
    powerConsumption: 200,
  },
  {
    id: "rtx-4080",
    name: "RTX 4080 16GB",
    vramGB: 16,
    memoryBandwidth: 736,
    performanceScore: 120,
    priceUSD: 1199,
    powerConsumption: 320,
  },
  {
    id: "rtx-4090",
    name: "RTX 4090 24GB",
    vramGB: 24,
    memoryBandwidth: 1008,
    performanceScore: 160,
    priceUSD: 1599,
    powerConsumption: 450,
  },
  {
    id: "rtx-3060",
    name: "RTX 3060 12GB",
    vramGB: 12,
    memoryBandwidth: 360,
    performanceScore: 60,
    priceUSD: 329,
    powerConsumption: 170,
  },
];

export const VPS_OPTIONS: VPSOption[] = [
  {
    id: "vast-ai-rtx4090",
    provider: "Vast.ai",
    name: "RTX 4090 24GB",
    vramGB: 24,
    monthlyCostUSD: 180,
    performanceScore: 160,
  },
  {
    id: "runpod-rtx4080",
    provider: "RunPod",
    name: "RTX 4080 16GB", 
    vramGB: 16,
    monthlyCostUSD: 120,
    performanceScore: 120,
  },
  {
    id: "paperspace-rtx4070",
    provider: "Paperspace",
    name: "RTX 4070 12GB",
    vramGB: 12,
    monthlyCostUSD: 89,
    performanceScore: 85,
  },
];

export type QuantizationType = "Q4" | "Q8" | "FP16";

export const QUANTIZATION_OPTIONS = [
  { id: "Q4", name: "Q4 (4-bit)", description: "Smallest size, good quality" },
  { id: "Q8", name: "Q8 (8-bit)", description: "Balanced size and quality" },
  { id: "FP16", name: "FP16 (16-bit)", description: "Best quality, largest size" },
] as const;