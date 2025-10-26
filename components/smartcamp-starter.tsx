"use client"

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { RadioGroup } from '@/components/ui/radio-group-demo'
import { Textarea } from '@/components/ui/textarea'
import { Toggle, Checkbox } from '@/components/ui/toggle'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'

// Mock data for demo purposes
const DEMO_MODELS = [
  { id: 'llama-7b', name: 'Llama 7B', parameterCount: '7B parameters' },
  { id: 'llama-13b', name: 'Llama 13B', parameterCount: '13B parameters' },
  { id: 'llama-70b', name: 'Llama 70B', parameterCount: '70B parameters' },
  { id: 'mistral-7b', name: 'Mistral 7B', parameterCount: '7B parameters' },
  { id: 'codellama-34b', name: 'CodeLlama 34B', parameterCount: '34B parameters' },
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

export default function SmartCampStarter() {
  const { t } = useI18n()

  // State management
  const [modelId, setModelId] = useState<string>('')
  const [targetTokensPerSecond, setTargetTokensPerSecond] = useState<number[]>([20])
  const [budgetUSD, setBudgetUSD] = useState<string>('')
  const [emailForReport, setEmailForReport] = useState<string>('')
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
  const [cpuCores, setCpuCores] = useState<number[]>([4])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          {t('title')}
        </h1>
        <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
          {t('description')}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
            <span className="text-white/70 text-sm">✨ {t('badges.glassMorphism')}</span>
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
            <span className="text-white/70 text-sm">🌿 {t('badges.jungleTech')}</span>
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
            <span className="text-white/70 text-sm">🎨 {t('badges.designSystem')}</span>
          </div>
        </div>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ========================================
            COLUMN 1: FORM ELEMENTS & BASIC INPUTS
            ======================================== */}
        <div className="rounded-lg border border-white/20 shadow-sm bg-white/15 backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15) !important' }}>
          <div className="flex flex-col space-y-1.5 p-6 border-b border-white/10">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">
              📝 {t('column1.title')}
            </h3>
            <p className="text-sm text-white/70">{t('column1.subtitle')}</p>
            <div className="mt-2 bg-emerald-500/10 border border-emerald-400/30 rounded-md p-3">
              <p className="text-xs text-emerald-300 font-mono">
                {t('column1.component')}
              </p>
            </div>
          </div>

          <div className="p-6 pt-4 space-y-6">
            {/* Text Inputs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column1.textInputs.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column1.textInputs.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <span className="text-emerald-400">●</span> {t('column1.textInputs.emailLabel')}
                  </label>
                  <Input
                    type="email"
                    placeholder={t('column1.textInputs.emailPlaceholder')}
                    value={emailForReport}
                    onChange={(e) => setEmailForReport(e.target.value)}
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.textInputs.emailSpec')}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <span className="text-emerald-400">●</span> {t('column1.textInputs.numberLabel')}
                  </label>
                  <Input
                    type="number"
                    placeholder={t('column1.textInputs.numberPlaceholder')}
                    value={budgetUSD}
                    onChange={(e) => setBudgetUSD(e.target.value)}
                    min="0"
                    step="100"
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.textInputs.numberSpec')}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <span className="text-emerald-400">●</span> {t('column1.textInputs.textLabel')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('column1.textInputs.textPlaceholder')}
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.textInputs.textSpec')}
                  </p>
                </div>
              </div>
            </div>

            {/* Textarea Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column1.textarea.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column1.textarea.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">{t('column1.textarea.label')}</label>
                  <Textarea
                    placeholder={t('column1.textarea.placeholder')}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.textarea.spec')}
                  </p>
                </div>
              </div>
            </div>

            {/* Select Dropdown Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column1.select.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column1.select.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">{t('column1.select.modelLabel')}</label>
                  <Select
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    placeholder={t('column1.select.modelPlaceholder')}
                  >
                    {DEMO_MODELS.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.parameterCount})
                      </option>
                    ))}
                  </Select>
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.select.modelSpec')}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">{t('column1.select.featuresLabel')}</label>
                  <Select
                    value=""
                    onChange={() => {}}
                    placeholder={t('column1.select.featuresPlaceholder')}
                  >
                    <option value="monitoring">⚡ {t('column1.select.options.monitoring')}</option>
                    <option value="backup">💾 {t('column1.select.options.backup')}</option>
                    <option value="security">🔒 {t('column1.select.options.security')}</option>
                    <option value="analytics">📊 {t('column1.select.options.analytics')}</option>
                  </Select>
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.select.featuresSpec')}
                  </p>
                </div>
              </div>
            </div>

            {/* Date Pickers Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column1.datePicker.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column1.datePicker.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">{t('column1.datePicker.singleLabel')}</label>
                  <DatePicker
                    value={projectStartDate}
                    onChange={setProjectStartDate}
                    placeholder={t('column1.datePicker.singlePlaceholder')}
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.datePicker.singleSpec')}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">{t('column1.datePicker.rangeLabel')}</label>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column1.datePicker.rangeSpec')}
                  </p>
                </div>
              </div>
            </div>

            {/* Design Specs */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-400/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-emerald-300 mb-2">🎨 {t('column1.specs.title')}</h5>
              <ul className="text-xs text-white/70 space-y-1 font-mono">
                <li>• {t('column1.specs.height')}</li>
                <li>• {t('column1.specs.border')}</li>
                <li>• {t('column1.specs.background')}</li>
                <li>• {t('column1.specs.backdrop')}</li>
                <li>• {t('column1.specs.radius')}</li>
                <li>• {t('column1.specs.focus')}</li>
                <li>• {t('column1.specs.placeholder')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================
            COLUMN 2: INTERACTIVE COMPONENTS
            ======================================== */}
        <div className="rounded-lg border border-white/20 shadow-sm bg-white/15 backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15) !important' }}>
          <div className="flex flex-col space-y-1.5 p-6 border-b border-white/10">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">
              🎮 {t('column2.title')}
            </h3>
            <p className="text-sm text-white/70">{t('column2.subtitle')}</p>
            <div className="mt-2 bg-emerald-500/10 border border-emerald-400/30 rounded-md p-3">
              <p className="text-xs text-emerald-300 font-mono">
                {t('column2.component')}
              </p>
            </div>
          </div>

          <div className="p-6 pt-4 space-y-6">
            {/* Slider Section with Banana Emoji */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column2.sliders.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column2.sliders.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white flex items-center justify-between">
                    <span>{t('column2.sliders.performance')}</span>
                    <span className="text-emerald-400 text-lg font-bold">{targetTokensPerSecond[0]}</span>
                  </label>
                  <Slider
                    value={targetTokensPerSecond}
                    onValueChange={setTargetTokensPerSecond}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/50">
                    <span>5 {t('column2.sliders.performanceMin')}</span>
                    <span>50 {t('column2.sliders.performanceMax')}</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono border-t border-white/10 pt-2 mt-2">
                    {t('column2.sliders.performanceSpec')}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white flex items-center justify-between">
                    <span>{t('column2.sliders.memory')}</span>
                    <span className="text-emerald-400 text-lg font-bold">{memoryLimit[0]} {t('column2.sliders.memoryMin')}</span>
                  </label>
                  <Slider
                    value={memoryLimit}
                    onValueChange={setMemoryLimit}
                    max={64}
                    min={4}
                    step={2}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/50">
                    <span>4 {t('column2.sliders.memoryMin')}</span>
                    <span>64 {t('column2.sliders.memoryMax')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white flex items-center justify-between">
                    <span>{t('column2.sliders.cpu')}</span>
                    <span className="text-emerald-400 text-lg font-bold">{cpuCores[0]}</span>
                  </label>
                  <Slider
                    value={cpuCores}
                    onValueChange={setCpuCores}
                    max={32}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/50">
                    <span>1 {t('column2.sliders.cpuMin')}</span>
                    <span>32 {t('column2.sliders.cpuMax')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Radio Button Groups */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column2.radioGroups.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column2.radioGroups.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">{t('column2.radioGroups.deploymentLabel')}</label>
                  <RadioGroup
                    options={DEMO_DEPLOYMENT_OPTIONS}
                    value={deploymentType}
                    onChange={setDeploymentType}
                    name="deployment"
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column2.radioGroups.deploymentSpec')}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">{t('column2.radioGroups.priorityLabel')}</label>
                  <RadioGroup
                    options={DEMO_PRIORITY_OPTIONS}
                    value={priority}
                    onChange={setPriority}
                    name="priority"
                  />
                  <p className="text-xs text-white/50 font-mono">
                    {t('column2.radioGroups.prioritySpec')}
                  </p>
                </div>
              </div>
            </div>

            {/* Toggles & Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column2.toggles.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column2.toggles.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-3">
                <Toggle
                  checked={enableAdvanced}
                  onChange={setEnableAdvanced}
                  label={t('column2.toggles.advanced')}
                  description={t('column2.toggles.advancedDesc')}
                />

                <Toggle
                  checked={enableNotifications}
                  onChange={setEnableNotifications}
                  label={t('column2.toggles.notifications')}
                  description={t('column2.toggles.notificationsDesc')}
                />

                <Toggle
                  checked={enableAutoScale}
                  onChange={setEnableAutoScale}
                  label={t('column2.toggles.autoScale')}
                  description={t('column2.toggles.autoScaleDesc')}
                />

                <div className="pt-2 border-t border-white/10">
                  <Checkbox
                    checked={acceptTerms}
                    onChange={setAcceptTerms}
                    label={t('column2.toggles.terms')}
                    description={t('column2.toggles.termsDesc')}
                  />
                </div>

                <p className="text-xs text-white/50 font-mono pt-2 border-t border-white/10">
                  {t('column2.toggles.spec')}
                </p>
              </div>
            </div>

            {/* Button Examples */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column2.buttons.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column2.buttons.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs text-white/60 mb-2">{t('column2.buttons.jungleLabel')}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="jungle" size="sm">{t('column2.buttons.jungleSmall')}</Button>
                    <Button variant="jungle">{t('column2.buttons.jungleMedium')}</Button>
                    <Button variant="jungle" size="lg">{t('column2.buttons.jungleLarge')}</Button>
                  </div>
                  <p className="text-xs text-white/50 font-mono">
                    {t('column2.buttons.jungleSpec')}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-white/60 mb-2">{t('column2.buttons.outlineLabel')}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">{t('column2.buttons.outlineDefault')}</Button>
                    <Button variant="outline" className="border-emerald-400/50 text-emerald-300">
                      {t('column2.buttons.outlineEmerald')}
                    </Button>
                  </div>
                  <p className="text-xs text-white/50 font-mono">
                    {t('column2.buttons.outlineSpec')}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-white/60 mb-2">{t('column2.buttons.otherLabel')}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">{t('column2.buttons.defaultBtn')}</Button>
                    <Button variant="ghost">{t('column2.buttons.ghostBtn')}</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Specs */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-400/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-emerald-300 mb-2">🎨 {t('column2.specs.title')}</h5>
              <ul className="text-xs text-white/70 space-y-1 font-mono">
                <li>• {t('column2.specs.sliderTrack')}</li>
                <li>• {t('column2.specs.sliderThumb')}</li>
                <li>• {t('column2.specs.radio')}</li>
                <li>• {t('column2.specs.toggle')}</li>
                <li>• {t('column2.specs.checkbox')}</li>
                <li>• {t('column2.specs.buttonHover')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================
            COLUMN 3: TYPOGRAPHY & DESIGN SYSTEM
            ======================================== */}
        <div className="rounded-lg border border-white/20 shadow-sm bg-white/15 backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15) !important' }}>
          <div className="flex flex-col space-y-1.5 p-6 border-b border-white/10">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">
              🎨 {t('column3.title')}
            </h3>
            <p className="text-sm text-white/70">{t('column3.subtitle')}</p>
            <div className="mt-2 bg-emerald-500/10 border border-emerald-400/30 rounded-md p-3">
              <p className="text-xs text-emerald-300 font-mono">
                {t('column3.component')}
              </p>
            </div>
          </div>

          <div className="p-6 pt-4 space-y-6">
            {/* Typography Scale */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column3.typography.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column3.typography.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-4">
                <div className="space-y-1">
                  <h1 className="text-4xl font-bold text-white">{t('column3.typography.h1')}</h1>
                  <p className="text-xs text-white/50 font-mono">{t('column3.typography.h1Spec')}</p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-semibold text-white">{t('column3.typography.h2')}</h2>
                  <p className="text-xs text-white/50 font-mono">{t('column3.typography.h2Spec')}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-medium text-white">{t('column3.typography.h3')}</h3>
                  <p className="text-xs text-white/50 font-mono">{t('column3.typography.h3Spec')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-base text-white/90">{t('column3.typography.body')}</p>
                  <p className="text-xs text-white/50 font-mono">{t('column3.typography.bodySpec')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-white/80">{t('column3.typography.small')}</p>
                  <p className="text-xs text-white/50 font-mono">{t('column3.typography.smallSpec')}</p>
                </div>
              </div>
            </div>

            {/* Font Weights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column3.fontWeights.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column3.fontWeights.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-light text-sm">{t('column3.fontWeights.light')}</span>
                  <code className="text-xs text-emerald-300">font-light</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-normal text-sm">{t('column3.fontWeights.regular')}</span>
                  <code className="text-xs text-emerald-300">font-normal</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{t('column3.fontWeights.medium')}</span>
                  <code className="text-xs text-emerald-300">font-medium</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">{t('column3.fontWeights.semibold')}</span>
                  <code className="text-xs text-emerald-300">font-semibold</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">{t('column3.fontWeights.bold')}</span>
                  <code className="text-xs text-emerald-300">font-bold</code>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column3.colors.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column3.colors.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-emerald-500 rounded-md flex items-center justify-center text-white font-medium text-xs shadow-lg">
                      {t('column3.colors.emerald500')}
                    </div>
                    <p className="text-xs text-white/50 font-mono text-center">#10b981</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-emerald-600 rounded-md flex items-center justify-center text-white font-medium text-xs shadow-lg">
                      {t('column3.colors.emerald600')}
                    </div>
                    <p className="text-xs text-white/50 font-mono text-center">#059669</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-white/20 backdrop-blur rounded-md flex items-center justify-center text-white font-medium text-xs border border-white/30">
                      {t('column3.colors.surface')}
                    </div>
                    <p className="text-xs text-white/50 font-mono text-center">white/20</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-white/10 backdrop-blur rounded-md flex items-center justify-center text-white font-medium text-xs border border-white/20">
                      {t('column3.colors.background')}
                    </div>
                    <p className="text-xs text-white/50 font-mono text-center">white/10</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-md flex items-center justify-center text-white font-medium text-xs shadow-lg">
                    {t('column3.colors.gradient')}
                  </div>
                  <p className="text-xs text-white/50 font-mono text-center">from-emerald-500 to-green-600</p>
                </div>
              </div>
            </div>

            {/* Spacing System */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column3.spacing.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column3.spacing.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-emerald-400 rounded shadow-md"></div>
                  <span className="text-sm text-white/80">2 (8px)</span>
                  <code className="text-xs text-emerald-300 ml-auto">space-2</code>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-6 bg-emerald-400 rounded shadow-md"></div>
                  <span className="text-sm text-white/80">4 (16px)</span>
                  <code className="text-xs text-emerald-300 ml-auto">space-4</code>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-400 rounded shadow-md"></div>
                  <span className="text-sm text-white/80">6 (24px)</span>
                  <code className="text-xs text-emerald-300 ml-auto">space-6</code>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-emerald-400 rounded shadow-md"></div>
                  <span className="text-sm text-white/80">8 (32px)</span>
                  <code className="text-xs text-emerald-300 ml-auto">space-8</code>
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column3.borderRadius.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column3.borderRadius.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="w-full h-10 bg-emerald-500/20 border border-emerald-400/50 rounded-sm flex items-center justify-center">
                    <span className="text-xs text-white font-medium">rounded-sm</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono text-center">2px</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-10 bg-emerald-500/20 border border-emerald-400/50 rounded-md flex items-center justify-center">
                    <span className="text-xs text-white font-medium">rounded-md</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono text-center">6px</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-10 bg-emerald-500/20 border border-emerald-400/50 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-white font-medium">rounded-lg</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono text-center">8px</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-10 bg-emerald-500/20 border border-emerald-400/50 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">rounded-full</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono text-center">9999px</p>
                </div>
              </div>
            </div>

            {/* Glass Morphism Specs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">{t('column3.glassMorphism.title')}</h4>
                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{t('column3.glassMorphism.badge')}</span>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-white/10 space-y-3">
                <div className="bg-white/15 backdrop-blur border border-white/20 rounded-lg p-3">
                  <p className="text-sm text-white/90 mb-2 font-semibold">{t('column3.glassMorphism.standard')}</p>
                  <code className="text-xs text-emerald-300 font-mono block">
                    bg-white/15 backdrop-blur
                    <br />border border-white/20
                  </code>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/15 rounded-lg p-3">
                  <p className="text-sm text-white/90 mb-2 font-semibold">{t('column3.glassMorphism.subtle')}</p>
                  <code className="text-xs text-emerald-300 font-mono block">
                    bg-white/10 backdrop-blur
                    <br />border border-white/15
                  </code>
                </div>
              </div>
            </div>

            {/* Complete Design Specs */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-400/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-emerald-300 mb-3 flex items-center gap-2">
                <span>📚</span> {t('column3.cssSpecs.title')}
              </h5>
              <div className="space-y-2 text-xs text-white/70 font-mono">
                <div className="bg-black/20 rounded p-2 border border-white/10">
                  <div className="text-emerald-300 mb-1">{t('column3.cssSpecs.colorsTitle')}</div>
                  <div>--foreground: #ffffff</div>
                  <div>--background: transparent</div>
                  <div>--card: rgba(255, 255, 255, 0.15)</div>
                  <div>--border: rgba(255, 255, 255, 0.2)</div>
                </div>
                <div className="bg-black/20 rounded p-2 border border-white/10">
                  <div className="text-emerald-300 mb-1">{t('column3.cssSpecs.effectsTitle')}</div>
                  <div>backdrop-filter: blur(10px)</div>
                  <div>box-shadow: 0 1px 3px rgba(0,0,0,0.1)</div>
                </div>
                <div className="bg-black/20 rounded p-2 border border-white/10">
                  <div className="text-emerald-300 mb-1">{t('column3.cssSpecs.transitionsTitle')}</div>
                  <div>{t('column3.cssSpecs.standardTransition')}</div>
                  <div>{t('column3.cssSpecs.hoverTransition')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-10 text-center">
        <div className="inline-block bg-white/10 backdrop-blur border border-white/20 rounded-lg px-6 py-4">
          <p className="text-white/90 text-sm mb-2">
            <span className="font-semibold">{t('footer.title')}</span> - {t('footer.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-white/70">
            <span>🎨 {t('footer.glassMorphism')}</span>
            <span>•</span>
            <span>🌿 {t('footer.jungleBackground')}</span>
            <span>•</span>
            <span>✨ {t('footer.interactiveComponents')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
