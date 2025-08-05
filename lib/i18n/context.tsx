"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
] as const

export type SupportedLanguageCode = typeof SUPPORTED_LANGUAGES[number]['code']

interface I18nContextType {
  language: SupportedLanguageCode
  setLanguage: (lang: SupportedLanguageCode) => void
  t: (key: string) => string
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Browser language detection function
function detectBrowserLanguage(): SupportedLanguageCode {
  if (typeof window === 'undefined') return 'en' // SSR fallback
  
  // Get browser languages in order of preference
  const browserLanguages = navigator.languages || [navigator.language]
  
  for (const browserLang of browserLanguages) {
    // Extract language code (e.g., 'en-US' -> 'en', 'pl-PL' -> 'pl')
    const langCode = browserLang.toLowerCase().split('-')[0]
    
    // Check if we support this language
    const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode)
    if (supportedLang) {
      return supportedLang.code
    }
  }
  
  // Fallback to English if no supported language found
  return 'en'
}

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguageCode>('en')
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Initialize language on mount
  useEffect(() => {
    const detectedLanguage = detectBrowserLanguage()
    setLanguageState(detectedLanguage)
  }, [])

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        const { default: newTranslations } = await import(`./translations/${language}.json`)
        setTranslations(newTranslations)
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error)
        // Fallback to English translations
        try {
          const { default: englishTranslations } = await import(`./translations/en.json`)
          setTranslations(englishTranslations)
        } catch (fallbackError) {
          console.error('Failed to load English fallback translations:', fallbackError)
          setTranslations({})
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [language])

  const setLanguage = (lang: SupportedLanguageCode) => {
    setLanguageState(lang)
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('smartcamp-language', lang)
    }
  }

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key // Return key if translation not found
  }

  // Load saved language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('smartcamp-language') as SupportedLanguageCode
      if (savedLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    isLoading
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}