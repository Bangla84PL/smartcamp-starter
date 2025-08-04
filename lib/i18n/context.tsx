"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKey } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Function to detect browser language
    const detectBrowserLanguage = (): Language => {
      if (typeof navigator === 'undefined') return 'en'
      
      // Get browser language, fallback to 'en' if not available
      const browserLang = navigator.language || navigator.languages?.[0] || 'en'
      
      // Map browser language codes to our supported languages
      const langCode = browserLang.toLowerCase()
      
      if (langCode.startsWith('pl')) return 'pl'
      if (langCode.startsWith('zh')) return 'zh'
      
      // Default to English for all other languages
      return 'en'
    }

    // Priority: 1. localStorage (user preference), 2. browser language, 3. default 'en'
    const savedLanguage = localStorage.getItem('language') as Language
    
    if (savedLanguage && ['en', 'pl', 'zh'].includes(savedLanguage)) {
      // User has previously selected a language
      setLanguage(savedLanguage)
    } else {
      // No saved preference, detect browser language
      const detectedLanguage = detectBrowserLanguage()
      setLanguage(detectedLanguage)
      // Save the detected language to localStorage for future visits
      localStorage.setItem('language', detectedLanguage)
    }
    
    setIsHydrated(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  // Prevent hydration mismatch by not rendering children until hydrated
  if (!isHydrated) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage: handleSetLanguage, t }}>
        <div suppressHydrationWarning>
          {children}
        </div>
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}