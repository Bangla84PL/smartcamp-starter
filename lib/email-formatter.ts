import type { CalculatorResult } from './calculator'
import { translations, Language } from './i18n/translations'

export function formatRecommendationsAsHTML(result: CalculatorResult, userEmail: string, language: Language = 'en'): string {
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key
  }
  // Get best GPU recommendation (first one that's within budget, or first overall)
  const bestGPU = result.recommendedGPUs && result.recommendedGPUs.length > 0 
    ? (result.recommendedGPUs.find(rec => rec.withinBudget) || result.recommendedGPUs[0])
    : null
  
  // Get best VPS option (first one that's within budget, or first overall)  
  const bestVPS = result.vpsOptions && result.vpsOptions.length > 0
    ? (result.vpsOptions.find(rec => rec.withinBudget) || result.vpsOptions[0])
    : null

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${t('emailReportTitle')}</title>
  <style>
    body { 
      font-family: 'Arial', sans-serif; 
      line-height: 1.6; 
      color: #ffffff; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px; 
      /* Email-compatible jungle background */
      background-color: #1a472a;
      background-image: linear-gradient(45deg, #1a472a 25%, #166534 25%, #166534 50%, #1a472a 50%, #1a472a 75%, #166534 75%);
      background-size: 40px 40px;
    }
    .container { 
      background-color: rgba(0, 0, 0, 0.3); 
      border: 2px solid #10b981;
      border-radius: 12px; 
      padding: 30px; 
    }
    .header { 
      background-color: rgba(0, 0, 0, 0.5);
      color: white; 
      padding: 32px 24px; 
      border-radius: 12px; 
      margin-bottom: 24px; 
      text-align: center;
      border: 1px solid #10b981;
    }
    .logo {
      margin-bottom: 20px;
    }
    .logo-text {
      font-size: 28px;
      font-weight: bold;
      color: #10b981;
      text-decoration: none;
      display: inline-block;
      padding: 10px 20px;
      border: 2px solid #10b981;
      border-radius: 8px;
      background: linear-gradient(135deg, #1a472a, #166534);
    }
    .logo-text:hover {
      background: linear-gradient(135deg, #166534, #10b981);
    }
    .header h1 { 
      margin: 16px 0 8px 0; 
      font-size: 28px; 
      background: linear-gradient(135deg, #10b981, #34d399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: #10b981; /* fallback */
    }
    .emoji { 
      font-size: 32px; 
      margin-right: 12px; 
    }
    .header p { 
      margin: 4px 0; 
      color: rgba(255, 255, 255, 0.9); 
      font-size: 16px; 
    }
    .recommendations { 
      margin-top: 32px; 
    }
    .recommendation-grid { 
      display: block; 
    }
    .recommendation-card { 
      background-color: rgba(0, 0, 0, 0.4); 
      border: 1px solid #10b981;
      border-radius: 12px; 
      padding: 24px; 
      margin-bottom: 20px; 
      transition: all 0.3s ease;
    }
    .recommendation-card h3 { 
      margin: 0 0 16px 0; 
      color: #10b981; 
      font-size: 20px; 
      font-weight: 600; 
      display: flex;
      align-items: center;
    }
    .recommendation-card h3 .emoji { 
      margin-right: 10px; 
      font-size: 24px; 
    }
    .price { 
      font-size: 24px; 
      font-weight: 700; 
      margin: 12px 0; 
    }
    .price.within-budget { 
      color: #10b981; 
    }
    .price.over-budget { 
      color: #ef4444; 
    }
    .specs { 
      list-style: none; 
      padding: 0; 
      margin: 14px 0 0 0; 
    }
    .specs li { 
      display: block; 
      padding: 8px 0; 
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .specs li:last-child { 
      border-bottom: none; 
    }
    .specs .label { 
      font-weight: 600; 
      color: #10b981; 
      display: inline-block;
      width: 140px;
    }
    .specs .value { 
      font-weight: 600; 
      color: #ffffff; 
    }
    .status { 
      display: inline-block; 
      padding: 6px 12px; 
      border-radius: 6px; 
      font-size: 14px; 
      font-weight: 600; 
      margin-top: 12px;
    }
    .status.recommended { 
      background-color: #10b981; 
      color: #ffffff; 
    }
    .status.budget-exceeded { 
      background-color: #ef4444; 
      color: #ffffff; 
    }
    .summary-box { 
      background-color: rgba(16, 185, 129, 0.2); 
      border: 2px solid #10b981;
      border-radius: 12px; 
      padding: 24px; 
      margin: 32px 0; 
      text-align: center;
    }
    .summary-box h2 { 
      margin: 0 0 16px 0; 
      color: #10b981; 
      font-size: 24px; 
    }
    .summary-box p { 
      margin: 8px 0; 
      font-size: 18px; 
      font-weight: 500; 
    }
    .footer { 
      margin-top: 40px; 
      text-align: center; 
      padding: 24px; 
      background-color: rgba(0, 0, 0, 0.3); 
      border-radius: 12px; 
      border: 1px solid #10b981;
    }
    .footer p { 
      margin: 8px 0; 
      color: rgba(255, 255, 255, 0.8); 
      font-size: 14px; 
    }
    .footer a { 
      color: #10b981; 
      text-decoration: none; 
      font-weight: 600; 
    }
    .footer a:hover { 
      color: #34d399; 
    }
    .divider { 
      height: 2px; 
      background: linear-gradient(90deg, transparent, #10b981, transparent); 
      margin: 32px 0; 
    }
    table { 
      width: 100%; 
      border-collapse: collapse; 
    }
    .metric { 
      text-align: center; 
      padding: 16px; 
    }
    .metric-value { 
      font-size: 24px; 
      font-weight: 700; 
      color: #10b981; 
      display: block; 
    }
    .metric-label { 
      font-size: 14px; 
      color: rgba(255, 255, 255, 0.8); 
      margin-top: 4px; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <a href="https://smartcamp.ai" target="_blank" class="logo-text">
          🏕️ SmartCamp.ai
        </a>
      </div>
                    <h1><span class="emoji">🖥️</span>${t('emailReportTitle')}</h1>
              <p><strong>${t('reportFor')}</strong> ${userEmail}</p>
              <p><strong>${t('generated')}</strong> ${new Date().toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>

    <div class="summary-box">
                            <h2>📊 ${t('configurationSummary')}</h2>
      <table>
        <tr>
          <td class="metric">
            <span class="metric-value">${result.model?.name || 'Unknown Model'}</span>
            <div class="metric-label">${t('selectedModel')}</div>
          </td>
          <td class="metric">
            <span class="metric-value">${result.quantization || 'Unknown'}</span>
            <div class="metric-label">${t('quantizationLabel')}</div>
          </td>
        </tr>
        <tr>
          <td class="metric">
            <span class="metric-value">${result.requirements?.ramGB || 0}GB</span>
            <div class="metric-label">${t('minRam')}</div>
          </td>
          <td class="metric">
            <span class="metric-value">${result.requirements?.vramGB || 0}GB</span>
            <div class="metric-label">${t('minVram')}</div>
          </td>
        </tr>
      </table>
    </div>

    <div class="divider"></div>

    <div class="recommendations">
      <h2 style="color: #10b981; font-size: 28px; margin-bottom: 24px; text-align: center;">
                                <span class="emoji">💡</span>${t('hardwareRecommendations')}
      </h2>
      
      <div class="recommendation-grid">
        ${bestGPU ? `
        <!-- GPU Recommendation -->
        <div class="recommendation-card">
          <h3><span class="emoji">🎮</span>${t('gpuRecommendation')}</h3>
          <div class="price ${bestGPU.withinBudget ? 'within-budget' : 'over-budget'}">
            $${bestGPU.gpu?.priceUSD?.toLocaleString() || 'N/A'}
          </div>
          <ul class="specs">
            <li><span class="label">${t('modelLabel')}</span> <span class="value">${bestGPU.gpu?.name || 'Unknown'}</span></li>
            <li><span class="label">VRAM:</span> <span class="value">${bestGPU.gpu?.vramGB || 0}GB</span></li>
            <li><span class="label">Memory Bandwidth:</span> <span class="value">${bestGPU.gpu?.memoryBandwidth || 0} GB/s</span></li>
            <li><span class="label">${t('performance')}</span> <span class="value">~${bestGPU.estimatedTokensPerSecond || 0} tokens/sec</span></li>
          </ul>
          <div class="status ${bestGPU.withinBudget ? 'recommended' : 'budget-exceeded'}">
            ${bestGPU.withinBudget ? `✅ ${t('withinBudget')}` : `⚠️ ${t('overBudget')}`}
          </div>
        </div>
        ` : ''}

        ${bestVPS ? `
        <!-- VPS Recommendation -->
        <div class="recommendation-card">
          <h3><span class="emoji">☁️</span>${t('vpsRecommendation')}</h3>
          <div class="price within-budget">
            $${bestVPS.vps?.monthlyCostUSD?.toLocaleString() || 'N/A'}/month
          </div>
          <ul class="specs">
            <li><span class="label">${t('provider')}</span> <span class="value">${bestVPS.vps?.provider || 'Unknown'}</span></li>
            <li><span class="label">${t('configuration')}</span> <span class="value">${bestVPS.vps?.name || 'Unknown'}</span></li>
            <li><span class="label">${t('performance')}</span> <span class="value">~${bestVPS.estimatedTokensPerSecond || 0} tokens/sec</span></li>
          </ul>
          <div class="status recommended">
            ✅ ${t('cloudSolution')}
          </div>
        </div>
        ` : ''}

        <!-- Requirements Summary -->
        <div class="recommendation-card">
          <h3><span class="emoji">📋</span>${t('technicalRequirements')}</h3>
          <ul class="specs">
            <li><span class="label">${t('modelLabel')}</span> <span class="value">${result.model?.name || 'Unknown'}</span></li>
            <li><span class="label">${t('parameterCount')}</span> <span class="value">${result.model?.parameterCount || 'Unknown'}</span></li>
            <li><span class="label">${t('minRam')}</span> <span class="value">${result.requirements?.ramGB || 0}GB</span></li>
            <li><span class="label">${t('minVram')}</span> <span class="value">${result.requirements?.vramGB || 0}GB</span></li>
            <li><span class="label">${t('quantizationLabel')}</span> <span class="value">${result.quantization || 'Unknown'}</span></li>
          </ul>
        </div>

        <!-- Summary Recommendation -->
        <div class="recommendation-card">
          <h3><span class="emoji">🎯</span>Our Recommendation</h3>
          <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0;">
            ${result.summary?.recommendation || 'No specific recommendation available.'}
          </p>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="footer">
      <p><strong>🏕️ SmartCamp.ai</strong></p>
      <p>Professional AI Hardware Calculator & Consultation</p>
      <p>
        <a href="https://smartcamp.ai" target="_blank">Visit SmartCamp.ai</a> | 
        <a href="mailto:hello@smartcamp.ai">Contact Us</a>
      </p>
      <p style="margin-top: 16px; font-size: 12px; color: rgba(255, 255, 255, 0.6);">
        ${t('reportFooterText')}
      </p>
    </div>
  </div>
</body>
</html>
  `
}
