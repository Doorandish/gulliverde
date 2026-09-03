import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'de' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('gulliver-lang')
    return (saved as Language) || 'de'
  })
  
  const [translations, setTranslations] = useState<Record<string, string>>({})

  useEffect(() => {
    localStorage.setItem('gulliver-lang', lang)
    document.documentElement.lang = lang
    
    // Dynamically load translation file
    import(`../i18n/${lang}.json`).then((module) => {
      setTranslations(module.default)
    })
  }, [lang])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
  }

  const t = (key: string) => {
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
