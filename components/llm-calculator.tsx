"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { calculateHardwareRequirements, CalculatorResult } from '@/lib/calculator'
import { LLM_MODELS, QUANTIZATION_OPTIONS, QuantizationType } from '@/lib/data/models'

export default function LLMCalculator() {
  const [modelId, setModelId] = useState<string>('')
  const [quantization, setQuantization] = useState<QuantizationType>('Q4')
  const [targetTokensPerSecond, setTargetTokensPerSecond] = useState<number[]>([20])
  const [budgetUSD, setBudgetUSD] = useState<string>('')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    if (!modelId || !budgetUSD) return

    setIsCalculating(true)
    try {
      const calculatorResult = calculateHardwareRequirements({
        modelId,
        quantization,
        targetTokensPerSecond: targetTokensPerSecond[0],
        budgetUSD: parseFloat(budgetUSD),
      })
      setResult(calculatorResult)
    } catch (error) {
      console.error('Calculation error:', error)
      setResult(null)
    } finally {
      setIsCalculating(false)
    }
  }

  // Auto-calculate when all inputs are filled
  const shouldAutoCalculate = modelId && quantization && budgetUSD && !isCalculating
  if (shouldAutoCalculate && !result) {
    handleCalculate()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">LLM Hardware Calculator</h1>
        <p className="text-white/80 text-lg">
          Find the perfect hardware to run your favorite Large Language Models
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="bg-white/15 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Select your model and performance requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">LLM Model</label>
              <Select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                placeholder="Choose a model"
              >
                {LLM_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.parameterCount})
                  </option>
                ))}
              </Select>
            </div>

            {/* Quantization */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quantization</label>
              <RadioGroup
                value={quantization}
                onValueChange={(value) => setQuantization(value as QuantizationType)}
              >
                {QUANTIZATION_OPTIONS.map((option) => (
                  <RadioGroupItem
                    key={option.id}
                    value={option.id}
                    id={option.id}
                  >
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </div>

            {/* Performance Target */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Target Performance: {targetTokensPerSecond[0]} tokens/second
              </label>
              <Slider
                value={targetTokensPerSecond}
                onValueChange={setTargetTokensPerSecond}
                max={50}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 tokens/s</span>
                <span>50 tokens/s</span>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget (USD)</label>
              <Input
                type="number"
                placeholder="Enter your budget"
                value={budgetUSD}
                onChange={(e) => setBudgetUSD(e.target.value)}
                min="0"
                step="100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="bg-white/15 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              Hardware suggestions based on your requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-8 text-muted-foreground">
                {isCalculating ? (
                  <div>Calculating recommendations...</div>
                ) : (
                  <div>Fill in the configuration to see recommendations</div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Requirements Summary */}
                <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Requirements</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/80">RAM needed:</span>
                      <span className="font-medium ml-2 text-white">{result.requirements.ramGB} GB</span>
                    </div>
                    <div>
                      <span className="text-white/80">VRAM needed:</span>
                      <span className="font-medium ml-2 text-white">{result.requirements.vramGB} GB</span>
                    </div>
                  </div>
                </div>

                {/* GPU Recommendations */}
                {result.recommendedGPUs.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-white">Local Hardware Options</h3>
                    <div className="space-y-3">
                      {result.recommendedGPUs.slice(0, 3).map((rec, index) => (
                        <div
                          key={rec.gpu.id}
                          className={`p-3 rounded-lg border backdrop-blur ${
                            rec.withinBudget
                              ? 'border-green-400/50 bg-green-500/20'
                              : 'border-white/30 bg-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-white">{rec.gpu.name}</div>
                              <div className="text-sm text-white/70">
                                {rec.gpu.vramGB} GB VRAM
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-white">${rec.gpu.priceUSD}</div>
                              <div className={`text-xs ${rec.withinBudget ? 'text-green-300' : 'text-red-300'}`}>
                                {rec.withinBudget ? 'Within budget' : 'Over budget'}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-white/70">Performance:</span>
                            <span className="ml-2 font-medium text-white">
                              ~{rec.estimatedTokensPerSecond} tokens/second
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VPS Options */}
                {result.vpsOptions.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-white">Cloud VPS Options</h3>
                    <div className="space-y-3">
                      {result.vpsOptions.slice(0, 3).map((rec, index) => (
                        <div
                          key={rec.vps.id}
                          className={`p-3 rounded-lg border backdrop-blur ${
                            rec.withinBudget
                              ? 'border-blue-400/50 bg-blue-500/20'
                              : 'border-white/30 bg-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-white">{rec.vps.provider}</div>
                              <div className="text-sm text-white/70">
                                {rec.vps.name}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-white">${rec.vps.monthlyCostUSD}/month</div>
                              <div className={`text-xs ${rec.withinBudget ? 'text-blue-300' : 'text-red-300'}`}>
                                {rec.withinBudget ? 'Within budget' : 'Over budget'}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-white/70">Performance:</span>
                            <span className="ml-2 font-medium text-white">
                              ~{rec.estimatedTokensPerSecond} tokens/second
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendation Summary */}
                <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Recommendation</h3>
                  <p className="text-sm text-white/90">{result.summary.recommendation}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}