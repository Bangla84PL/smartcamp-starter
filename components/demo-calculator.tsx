"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group-demo'
import { Textarea } from '@/components/ui/textarea'
import { Toggle, Checkbox } from '@/components/ui/toggle'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'

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

const DEMO_DEPLOYMENT_OPTIONS = [
  { id: 'local', label: 'Local Hardware', description: 'Run on your own GPU' },
  { id: 'cloud', label: 'Cloud VPS', description: 'Rent cloud computing power' },
  { id: 'hybrid', label: 'Hybrid Setup', description: 'Combine local and cloud resources' },
]

const DEMO_PRIORITY_OPTIONS = [
  { id: 'speed', label: 'Speed Priority', description: 'Optimize for fastest inference' },
  { id: 'cost', label: 'Cost Priority', description: 'Optimize for lowest cost' },
  { id: 'quality', label: 'Quality Priority', description: 'Optimize for best output quality' },
  { id: 'balanced', label: 'Balanced', description: 'Balance between all factors' },
]



export default function DemoCalculator() {
  const [modelId, setModelId] = useState<string>('')
  const [quantization, setQuantization] = useState<string>('')
  const [targetTokensPerSecond, setTargetTokensPerSecond] = useState<number[]>([20])
  const [budgetUSD, setBudgetUSD] = useState<string>('')

  const [emailForReport, setEmailForReport] = useState<string>('')
  
  // New state for additional components
  const [deploymentType, setDeploymentType] = useState<string>('')
  const [priority, setPriority] = useState<string>('')
  const [projectDescription, setProjectDescription] = useState<string>('')
  const [enableAdvanced, setEnableAdvanced] = useState(false)
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [enableAutoScale, setEnableAutoScale] = useState(false)
  const [projectStartDate, setProjectStartDate] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [memoryLimit, setMemoryLimit] = useState<number[]>([16])



  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">SmartCamp.AI Starter Template</h1>
        <p className="text-white/80 text-lg">
          This is a demo showcasing the visual design and components. Perfect for building new apps with the same look and feel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Elements - Interactive UI Components */}
        <div className="rounded-lg border border-white/20 shadow-sm bg-white/15 backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15) !important' }}>
          <CardHeader>
            <CardTitle>Elements</CardTitle>
            <CardDescription>
              Interactive UI components from our design system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dropdown/Select Menus */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Dropdown & Select</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Model Selection</label>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Features</label>
                <Select
                  value=""
                  onChange={() => {}}
                  placeholder="Select additional features"
                >
                  <option value="monitoring">Performance Monitoring</option>
                  <option value="backup">Automated Backups</option>
                  <option value="security">Enhanced Security</option>
                  <option value="analytics">Advanced Analytics</option>
                </Select>
              </div>
            </div>

            {/* Radio Button Groups */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Radio Buttons</h3>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">Deployment Type</label>
                <RadioGroup
                  options={DEMO_DEPLOYMENT_OPTIONS}
                  value={deploymentType}
                  onChange={setDeploymentType}
                  name="deployment"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Optimization Priority</label>
                <RadioGroup
                  options={DEMO_PRIORITY_OPTIONS}
                  value={priority}
                  onChange={setPriority}
                  name="priority"
                />
              </div>
            </div>

            {/* Text Inputs */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Text Inputs</h3>
              
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={emailForReport}
                  onChange={(e) => setEmailForReport(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project Description</label>
                <Textarea
                  placeholder="Describe your project goals and requirements..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Range Sliders</h3>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Performance Target: {targetTokensPerSecond[0]} tokens/second
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

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Memory Limit: {memoryLimit[0]} GB
                </label>
                <Slider
                  value={memoryLimit}
                  onValueChange={setMemoryLimit}
                  max={64}
                  min={4}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4 GB</span>
                  <span>64 GB</span>
                </div>
              </div>
            </div>

            {/* Date Pickers */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Date Pickers</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Start Date</label>
                <DatePicker
                  value={projectStartDate}
                  onChange={setProjectStartDate}
                  placeholder="Select start date"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Analysis Period</label>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                />
              </div>
            </div>

            {/* Toggles & Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Toggles & Checkboxes</h3>
              
              <Toggle
                checked={enableAdvanced}
                onChange={setEnableAdvanced}
                label="Enable Advanced Options"
                description="Show additional configuration options"
              />
              
              <Toggle
                checked={enableNotifications}
                onChange={setEnableNotifications}
                label="Email Notifications"
                description="Receive updates about your project"
              />
              
              <Toggle
                checked={enableAutoScale}
                onChange={setEnableAutoScale}
                label="Auto-scaling"
                description="Automatically adjust resources based on demand"
              />
              
              <Checkbox
                checked={acceptTerms}
                onChange={setAcceptTerms}
                label="Accept Terms and Conditions"
                description="I agree to the terms of service and privacy policy"
              />
            </div>
          </CardContent>
        </div>

        {/* Column 2: Typography - Copy of left column structure */}
        <div className="rounded-lg border border-white/20 shadow-sm bg-white/15 backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15) !important' }}>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>
              Visual styles and design system elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Typography Showcase Content */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Typography Scale</h3>
              
              <div className="space-y-3">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">Heading 1</h1>
                  <code className="text-xs text-white/60">text-4xl font-bold</code>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-1">Heading 2</h2>
                  <code className="text-xs text-white/60">text-3xl font-semibold</code>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-1">Heading 3</h3>
                  <code className="text-xs text-white/60">text-2xl font-medium</code>
                </div>
                <div>
                  <p className="text-base text-white/90 mb-1">Body Text - Regular paragraph text</p>
                  <code className="text-xs text-white/60">text-base text-white/90</code>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Color Palette</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="w-full h-12 bg-emerald-500 rounded-md flex items-center justify-center text-white font-medium text-sm">
                    Primary
                  </div>
                  <code className="text-xs text-white/60">emerald-500</code>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-12 bg-emerald-600 rounded-md flex items-center justify-center text-white font-medium text-sm">
                    Primary Dark
                  </div>
                  <code className="text-xs text-white/60">emerald-600</code>
                </div>
              </div>
            </div>

            {/* Button Examples */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/20 pb-2">Button Variations</h3>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="jungle" size="sm">
                  Primary Small
                </Button>
                <Button variant="jungle" size="default">
                  Primary Medium
                </Button>
                <Button variant="outline" size="default" className="border-white/30 text-white hover:bg-white/10">
                  Outline
                </Button>
              </div>
            </div>
          </CardContent>
        </div>


      </div>
    </div>
  )
}