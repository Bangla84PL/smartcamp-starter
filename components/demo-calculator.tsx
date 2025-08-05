"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

// Mock data for demo purposes
const DEMO_MODELS = [
  { id: 'llama-7b', name: 'Llama 7B', parameterCount: '7B parameters' },
  { id: 'llama-13b', name: 'Llama 13B', parameterCount: '13B parameters' },
  { id: 'llama-70b', name: 'Llama 70B', parameterCount: '70B parameters' },
  { id: 'mistral-7b', name: 'Mistral 7B', parameterCount: '7B parameters' },
  { id: 'codellama-34b', name: 'CodeLlama 34B', parameterCount: '34B parameters' },
]

const DEMO_QUANTIZATION = [
  { id: 'Q4_K_M', name: 'Q4_K_M', description: 'Good quality, smaller size' },
  { id: 'Q8_0', name: 'Q8_0', description: 'High quality, medium size' },
  { id: 'FP16', name: 'FP16', description: 'Highest quality, largest size' },
]

const DEMO_GPU_RECOMMENDATIONS = [
  {
    id: 'rtx-4090',
    name: 'NVIDIA RTX 4090',
    vram: '24 GB',
    price: '$1,599',
    performance: '45 tokens/sec',
    status: 'recommended',
    withinBudget: true
  },
  {
    id: 'rtx-4080',
    name: 'NVIDIA RTX 4080',
    vram: '16 GB',
    price: '$1,199',
    performance: '32 tokens/sec',
    status: 'good',
    withinBudget: true
  },
  {
    id: 'rtx-3090',
    name: 'NVIDIA RTX 3090',
    vram: '24 GB',
    price: '$899',
    performance: '38 tokens/sec',
    status: 'budget',
    withinBudget: true
  }
]

const DEMO_VPS_OPTIONS = [
  {
    id: 'aws-p3',
    provider: 'AWS',
    name: 'p3.2xlarge',
    cost: '$89/month',
    performance: '42 tokens/sec',
    withinBudget: true
  },
  {
    id: 'gcp-a100',
    provider: 'Google Cloud',
    name: 'A100 Instance',
    cost: '$156/month',
    performance: '58 tokens/sec',
    withinBudget: false
  },
  {
    id: 'runpod-rtx4090',
    provider: 'RunPod',
    name: 'RTX 4090 Pod',
    cost: '$65/month',
    performance: '45 tokens/sec',
    withinBudget: true
  }
]

export default function DemoCalculator() {
  const [modelId, setModelId] = useState<string>('')
  const [quantization, setQuantization] = useState<string>('')
  const [targetTokensPerSecond, setTargetTokensPerSecond] = useState<number[]>([20])
  const [budgetUSD, setBudgetUSD] = useState<string>('')
  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [emailForReport, setEmailForReport] = useState<string>('')

  const handleCalculate = () => {
    if (!modelId || !budgetUSD) return

    setIsCalculating(true)
    
    // Simulate calculation delay
    setTimeout(() => {
      setShowResults(true)
      setIsCalculating(false)
    }, 1500)
  }

  const handleSendReport = () => {
    if (!emailForReport.trim()) return
    
    // Simulate sending report
    alert('This is a demo! In a real app, this would send an email report.')
    setEmailForReport('')
  }

  // Check if form is valid for calculation
  const isFormValid = modelId && quantization && budgetUSD && !isCalculating

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">SmartCamp.AI Starter Template</h1>
        <p className="text-white/80 text-lg">
          This is a demo showcasing the visual design and components. Perfect for building new apps with the same look and feel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="bg-white/15 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Configure your preferences to see demo results
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
                {DEMO_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.parameterCount})
                  </option>
                ))}
              </Select>
            </div>

            {/* Quantization */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantization</label>
              <Select
                value={quantization}
                onChange={(e) => setQuantization(e.target.value)}
                placeholder="Choose quantization"
              >
                {DEMO_QUANTIZATION.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} - {option.description}
                  </option>
                ))}
              </Select>
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
                <span>5 tokens/sec</span>
                <span>50 tokens/sec</span>
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

            {/* Demo Button */}
            <div className="pt-4">
              <Button
                variant="jungle"
                size="lg"
                onClick={handleCalculate}
                disabled={!isFormValid}
                className="w-full relative"
              >
                {isCalculating ? 'Generating Demo Results...' : 'Show Demo Results'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="bg-white/15 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle>Demo Results</CardTitle>
            <CardDescription>
              Sample results showcasing the design system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <div className="text-center py-8 text-white/70">
                {isCalculating ? (
                  <div>Generating demo recommendations...</div>
                ) : (
                  <div>Fill out the configuration to see demo results</div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Requirements Summary */}
                <div className="bg-black/20 border border-white/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Demo Requirements</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/80">RAM Needed:</span>
                      <span className="font-medium ml-2 text-white">32 GB</span>
                    </div>
                    <div>
                      <span className="text-white/80">VRAM Needed:</span>
                      <span className="font-medium ml-2 text-white">16 GB</span>
                    </div>
                  </div>
                </div>

                {/* GPU Recommendations */}
                <div>
                  <h3 className="font-semibold mb-3 text-white">Local Hardware Options</h3>
                  <div className="space-y-3">
                    {DEMO_GPU_RECOMMENDATIONS.map((rec) => (
                      <div
                        key={rec.id}
                        className={`p-3 rounded-lg border backdrop-blur ${
                          rec.withinBudget
                            ? 'border-green-400/50 bg-green-500/20'
                            : 'border-white/30 bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium text-white">{rec.name}</div>
                            <div className="text-sm text-white/70">
                              {rec.vram} VRAM
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-white">{rec.price}</div>
                            <div className={`text-xs ${rec.withinBudget ? 'text-green-300' : 'text-red-300'}`}>
                              {rec.withinBudget ? 'Within Budget' : 'Over Budget'}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-white/70">Performance:</span>
                          <span className="ml-2 font-medium text-white">
                            ~{rec.performance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VPS Options */}
                <div>
                  <h3 className="font-semibold mb-3 text-white">Cloud VPS Options</h3>
                  <div className="space-y-3">
                    {DEMO_VPS_OPTIONS.map((rec) => (
                      <div
                        key={rec.id}
                        className={`p-3 rounded-lg border backdrop-blur ${
                          rec.withinBudget
                            ? 'border-blue-400/50 bg-blue-500/20'
                            : 'border-white/30 bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium text-white">{rec.provider}</div>
                            <div className="text-sm text-white/70">
                              {rec.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-white">{rec.cost}</div>
                            <div className={`text-xs ${rec.withinBudget ? 'text-blue-300' : 'text-red-300'}`}>
                              {rec.withinBudget ? 'Within Budget' : 'Over Budget'}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-white/70">Performance:</span>
                          <span className="ml-2 font-medium text-white">
                            ~{rec.performance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation Summary */}
                <div className="bg-black/20 border border-white/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Demo Recommendation</h3>
                  <p className="text-sm text-white/90">
                    This is a sample recommendation showing how the design system handles different content types and layouts. 
                    Perfect for showcasing the visual hierarchy and component styling.
                  </p>
                </div>

                {/* Email Report Section */}
                <div className="bg-gradient-to-br from-emerald-900/30 to-green-800/20 border-2 border-emerald-400/50 p-5 rounded-xl shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
                  <h3 className="font-semibold text-white mb-3">📧 Demo Email Report</h3>
                  <p className="text-sm text-white/70 mb-3">
                    This demonstrates the email report feature styling. In a real app, this would integrate with your backend.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={emailForReport}
                      onChange={(e) => setEmailForReport(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="jungle"
                      size="lg"
                      onClick={handleSendReport}
                      disabled={!emailForReport.trim()}
                      className="sm:w-auto w-full"
                    >
                      Send Demo Report
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}