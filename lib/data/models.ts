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
  // Llama Models
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
    id: "llama3-8b",
    name: "Llama 3 8B",
    parameterCount: "8B",
    baseMemoryGBQ4: 10,
    baseMemoryGBQ8: 16,
    baseMemoryGBFP16: 32,
    baseVRAMGBQ4: 7,
    baseVRAMGBQ8: 12,
    baseVRAMGBFP16: 24,
  },
  {
    id: "llama3-70b",
    name: "Llama 3 70B",
    parameterCount: "70B",
    baseMemoryGBQ4: 85,
    baseMemoryGBQ8: 145,
    baseMemoryGBFP16: 290,
    baseVRAMGBQ4: 65,
    baseVRAMGBQ8: 105,
    baseVRAMGBFP16: 210,
  },
  // Mistral Models
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
    id: "mixtral-8x7b",
    name: "Mixtral 8x7B",
    parameterCount: "47B",
    baseMemoryGBQ4: 55,
    baseMemoryGBQ8: 94,
    baseMemoryGBFP16: 188,
    baseVRAMGBQ4: 40,
    baseVRAMGBQ8: 70,
    baseVRAMGBFP16: 140,
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    parameterCount: "123B",
    baseMemoryGBQ4: 140,
    baseMemoryGBQ8: 245,
    baseMemoryGBFP16: 490,
    baseVRAMGBQ4: 105,
    baseVRAMGBQ8: 185,
    baseVRAMGBFP16: 370,
  },
  // Code Models
  {
    id: "codellama-7b",
    name: "CodeLlama 7B",
    parameterCount: "7B",
    baseMemoryGBQ4: 8,
    baseMemoryGBQ8: 14,
    baseMemoryGBFP16: 28,
    baseVRAMGBQ4: 6,
    baseVRAMGBQ8: 10,
    baseVRAMGBFP16: 20,
  },
  {
    id: "codellama-13b",
    name: "CodeLlama 13B",
    parameterCount: "13B",
    baseMemoryGBQ4: 16,
    baseMemoryGBQ8: 26,
    baseMemoryGBFP16: 52,
    baseVRAMGBQ4: 12,
    baseVRAMGBQ8: 18,
    baseVRAMGBFP16: 36,
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
  {
    id: "deepseek-coder-33b",
    name: "DeepSeek Coder 33B",
    parameterCount: "33B",
    baseMemoryGBQ4: 38,
    baseMemoryGBQ8: 66,
    baseMemoryGBFP16: 132,
    baseVRAMGBQ4: 28,
    baseVRAMGBQ8: 48,
    baseVRAMGBFP16: 96,
  },
  // Claude-like Models
  {
    id: "yi-34b",
    name: "Yi 34B",
    parameterCount: "34B",
    baseMemoryGBQ4: 40,
    baseMemoryGBQ8: 68,
    baseMemoryGBFP16: 136,
    baseVRAMGBQ4: 30,
    baseVRAMGBQ8: 50,
    baseVRAMGBFP16: 100,
  },
  {
    id: "qwen-72b",
    name: "Qwen 72B",
    parameterCount: "72B",
    baseMemoryGBQ4: 85,
    baseMemoryGBQ8: 144,
    baseMemoryGBFP16: 288,
    baseVRAMGBQ4: 64,
    baseVRAMGBQ8: 108,
    baseVRAMGBFP16: 216,
  },
  // Smaller Efficient Models
  {
    id: "phi-3-mini",
    name: "Phi-3 Mini 3.8B",
    parameterCount: "3.8B",
    baseMemoryGBQ4: 4,
    baseMemoryGBQ8: 7,
    baseMemoryGBFP16: 14,
    baseVRAMGBQ4: 3,
    baseVRAMGBQ8: 5,
    baseVRAMGBFP16: 10,
  },
  {
    id: "gemma-7b",
    name: "Gemma 7B",
    parameterCount: "7B",
    baseMemoryGBQ4: 8,
    baseMemoryGBQ8: 14,
    baseMemoryGBFP16: 28,
    baseVRAMGBQ4: 6,
    baseVRAMGBQ8: 10,
    baseVRAMGBFP16: 20,
  },
];

export const GPU_SPECS: GPUSpec[] = [
  // Consumer RTX 40 Series
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
    id: "rtx-4070-super",
    name: "RTX 4070 Super 12GB",
    vramGB: 12,
    memoryBandwidth: 504,
    performanceScore: 95,
    priceUSD: 699,
    powerConsumption: 220,
  },
  {
    id: "rtx-4070-ti-super",
    name: "RTX 4070 Ti Super 16GB",
    vramGB: 16,
    memoryBandwidth: 672,
    performanceScore: 110,
    priceUSD: 899,
    powerConsumption: 285,
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
    id: "rtx-4080-super",
    name: "RTX 4080 Super 16GB",
    vramGB: 16,
    memoryBandwidth: 736,
    performanceScore: 130,
    priceUSD: 1099,
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
  // RTX 30 Series
  {
    id: "rtx-3060",
    name: "RTX 3060 12GB",
    vramGB: 12,
    memoryBandwidth: 360,
    performanceScore: 60,
    priceUSD: 329,
    powerConsumption: 170,
  },
  {
    id: "rtx-3070",
    name: "RTX 3070 8GB",
    vramGB: 8,
    memoryBandwidth: 448,
    performanceScore: 70,
    priceUSD: 399,
    powerConsumption: 220,
  },
  {
    id: "rtx-3080",
    name: "RTX 3080 10GB",
    vramGB: 10,
    memoryBandwidth: 760,
    performanceScore: 90,
    priceUSD: 699,
    powerConsumption: 320,
  },
  {
    id: "rtx-3090",
    name: "RTX 3090 24GB",
    vramGB: 24,
    memoryBandwidth: 936,
    performanceScore: 140,
    priceUSD: 1499,
    powerConsumption: 350,
  },
  // Professional Cards
  {
    id: "rtx-a6000",
    name: "RTX A6000 48GB",
    vramGB: 48,
    memoryBandwidth: 768,
    performanceScore: 150,
    priceUSD: 4650,
    powerConsumption: 300,
  },
  {
    id: "h100-80gb",
    name: "H100 80GB",
    vramGB: 80,
    memoryBandwidth: 3350,
    performanceScore: 400,
    priceUSD: 25000,
    powerConsumption: 700,
  },
  {
    id: "a100-80gb",
    name: "A100 80GB",
    vramGB: 80,
    memoryBandwidth: 2039,
    performanceScore: 300,
    priceUSD: 15000,
    powerConsumption: 400,
  },
  // AMD Options
  {
    id: "rx-7900-xtx",
    name: "RX 7900 XTX 24GB",
    vramGB: 24,
    memoryBandwidth: 960,
    performanceScore: 135,
    priceUSD: 999,
    powerConsumption: 355,
  },
];

export const VPS_OPTIONS: VPSOption[] = [
  // Consumer GPU VPS
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
  {
    id: "vast-ai-rtx3090",
    provider: "Vast.ai",
    name: "RTX 3090 24GB",
    vramGB: 24,
    monthlyCostUSD: 150,
    performanceScore: 140,
  },
  // Professional GPU VPS
  {
    id: "lambda-a100",
    provider: "Lambda Labs",
    name: "A100 40GB",
    vramGB: 40,
    monthlyCostUSD: 1100,
    performanceScore: 280,
  },
  {
    id: "vast-ai-a100-80gb",
    provider: "Vast.ai",
    name: "A100 80GB",
    vramGB: 80,
    monthlyCostUSD: 1800,
    performanceScore: 300,
  },
  {
    id: "runpod-h100",
    provider: "RunPod",
    name: "H100 80GB",
    vramGB: 80,
    monthlyCostUSD: 4500,
    performanceScore: 400,
  },
  // Multi-GPU Options
  {
    id: "vast-ai-2x4090",
    provider: "Vast.ai",
    name: "2x RTX 4090 48GB",
    vramGB: 48,
    monthlyCostUSD: 340,
    performanceScore: 300,
  },
  {
    id: "lambda-8xa100",
    provider: "Lambda Labs", 
    name: "8x A100 320GB",
    vramGB: 320,
    monthlyCostUSD: 8000,
    performanceScore: 2000,
  },
];

export type QuantizationType = "Q2_K" | "Q4_0" | "Q4_K_M" | "Q5_K_M" | "Q8_0" | "FP16" | "FP32";

export const QUANTIZATION_OPTIONS = [
  { id: "Q2_K", name: "Q2_K", description: "Extremely small, very low quality - experimental" },
  { id: "Q4_0", name: "Q4_0", description: "Small size, moderate quality - legacy format" },
  { id: "Q4_K_M", name: "Q4_K_M", description: "Medium size, good quality - recommended" },
  { id: "Q5_K_M", name: "Q5_K_M", description: "Large size, very good quality" },
  { id: "Q8_0", name: "Q8_0", description: "Very large, high quality" },
  { id: "FP16", name: "FP16", description: "Maximum size, best quality" },
  { id: "FP32", name: "FP32", description: "Largest size, research quality" },
] as const;