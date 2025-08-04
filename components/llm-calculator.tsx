"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { calculateHardwareRequirements, CalculatorResult } from '@/lib/calculator'
import { LLM_MODELS, QUANTIZATION_OPTIONS, QuantizationType } from '@/lib/data/models'
import { useLanguage } from '@/lib/i18n/context'
import { saveEmailReport } from '@/app/actions/save-email-report'

export default function LLMCalculator() {
  const { t } = useLanguage()
  const [modelId, setModelId] = useState<string>('')
  const [quantization, setQuantization] = useState<QuantizationType>('Q4_K_M')
  const [targetTokensPerSecond, setTargetTokensPerSecond] = useState<number[]>([20])
  const [budgetUSD, setBudgetUSD] = useState<string>('')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [emailForReport, setEmailForReport] = useState<string>('')
  const [isSendingReport, setIsSendingReport] = useState(false)
  const [reportSentMessage, setReportSentMessage] = useState<string>('')

  const handleCalculate = () => {
    if (!modelId || !budgetUSD) return

    setIsCalculating(true)
    // Clear previous report messages
    setReportSentMessage('')
    setEmailForReport('')
    
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

  const handleSendReport = async () => {
    if (!emailForReport.trim() || !result) return

    setIsSendingReport(true)
    setReportSentMessage('')

    try {
      const saveResult = await saveEmailReport(emailForReport, result)
      
      if (saveResult.success) {
        setReportSentMessage('Report saved! You should receive an email shortly.')
        setEmailForReport('')
      } else {
        setReportSentMessage(saveResult.message)
      }
    } catch (error) {
      console.error('Error sending report:', error)
      setReportSentMessage('Failed to save report. Please try again.')
    } finally {
      setIsSendingReport(false)
    }
  }

  // Check if form is valid for calculation
  const isFormValid = modelId && quantization && budgetUSD && !isCalculating

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{t('appTitle')}</h1>
        <p className="text-white/80 text-lg">
          {t('appSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="bg-white/15 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle>{t('configuration')}</CardTitle>
            <CardDescription>
              {t('configDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('llmModel')}</label>
              <Select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                placeholder={t('chooseModel')}
              >
                {LLM_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.parameterCount})
                  </option>
                ))}
              </Select>
            </div>

            {/* Quantization */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('quantization')}</label>
              <Select
                value={quantization}
                onChange={(e) => setQuantization(e.target.value as QuantizationType)}
                placeholder={t('chooseQuantization')}
              >
                {QUANTIZATION_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} - {option.description}
                  </option>
                ))}
              </Select>
            </div>

            {/* Performance Target */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                {t('targetPerformance')}: {targetTokensPerSecond[0]} {t('tokensPerSecond')}
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
                <span>5 {t('tokensPerSecond')}</span>
                <span>50 {t('tokensPerSecond')}</span>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('budget')}</label>
              <Input
                type="number"
                placeholder={t('enterBudget')}
                value={budgetUSD}
                onChange={(e) => setBudgetUSD(e.target.value)}
                min="0"
                step="100"
              />
            </div>

            {/* Check Config Button */}
            <div className="pt-4">
              <Button
                variant="jungle"
                size="lg"
                onClick={handleCalculate}
                disabled={!isFormValid}
                className="w-full relative"
              >
                {isCalculating ? t('calculating') : t('checkConfig')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="bg-white/15 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle>{t('recommendations')}</CardTitle>
            <CardDescription>
              {t('recommendationsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-8 text-white/70">
                {isCalculating ? (
                  <div>{t('calculatingRecommendations')}</div>
                ) : (
                  <div>{t('fillConfiguration')}</div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Requirements Summary */}
                <div className="bg-black/20 border border-white/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">{t('requirements')}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/80">{t('ramNeeded')}:</span>
                      <span className="font-medium ml-2 text-white">{result.requirements.ramGB} {t('gb')}</span>
                    </div>
                    <div>
                      <span className="text-white/80">{t('vramNeeded')}:</span>
                      <span className="font-medium ml-2 text-white">{result.requirements.vramGB} {t('gb')}</span>
                    </div>
                  </div>
                </div>

                {/* GPU Recommendations */}
                {result.recommendedGPUs.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-white">{t('localHardware')}</h3>
                    <div className="space-y-3">
                      {result.recommendedGPUs.slice(0, 3).map((rec) => (
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
                                {rec.gpu.vramGB} {t('gb')} {t('vram')}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-white">${rec.gpu.priceUSD}</div>
                              <div className={`text-xs ${rec.withinBudget ? 'text-green-300' : 'text-red-300'}`}>
                                {rec.withinBudget ? t('withinBudget') : t('overBudget')}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-white/70">{t('performance')}:</span>
                            <span className="ml-2 font-medium text-white">
                              ~{rec.estimatedTokensPerSecond} {t('tokensPerSecond')}
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
                    <h3 className="font-semibold mb-3 text-white">{t('cloudVPS')}</h3>
                    <div className="space-y-3">
                      {result.vpsOptions.slice(0, 3).map((rec) => (
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
                              <div className="font-medium text-white">${rec.vps.monthlyCostUSD}{t('month')}</div>
                              <div className={`text-xs ${rec.withinBudget ? 'text-blue-300' : 'text-red-300'}`}>
                                {rec.withinBudget ? t('withinBudget') : t('overBudget')}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-white/70">{t('performance')}:</span>
                            <span className="ml-2 font-medium text-white">
                              ~{rec.estimatedTokensPerSecond} {t('tokensPerSecond')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendation Summary */}
                <div className="bg-black/20 border border-white/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">{t('recommendation')}</h3>
                  <p className="text-sm text-white/90">{result.summary.recommendation}</p>
                </div>

                                  {/* Email Report Section */}
                  <div className="bg-black/20 border border-white/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-white mb-3">📧 {t('emailReport')}</h3>
                    <p className="text-sm text-white/70 mb-3">
                      Get detailed hardware recommendations sent to your email for easy reference and sharing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder={t('enterEmailForReport')}
                        value={emailForReport}
                        onChange={(e) => setEmailForReport(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="jungle"
                        size="lg"
                        onClick={handleSendReport}
                        disabled={!emailForReport.trim() || isSendingReport}
                        className="sm:w-auto w-full"
                      >
                        {isSendingReport ? t('sending') : t('sendReport')}
                      </Button>
                    </div>
                    {reportSentMessage && (
                      <div className={`text-sm mt-2 p-2 rounded ${
                        reportSentMessage.includes('saved') || reportSentMessage.includes('shortly') 
                          ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-200 border border-red-500/30'
                      }`}>
                        {reportSentMessage}
                      </div>
                    )}
                  </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}