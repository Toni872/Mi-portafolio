'use client'

import { useState, useRef, useEffect } from 'react'
import { Languages, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'es' as const, labelEs: 'Español', labelEn: 'Spanish', flag: '🇪🇸' },
    { code: 'en' as const, labelEs: 'Inglés', labelEn: 'English', flag: '🇬🇧' },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
        aria-label={t.common.selectLanguage}
        aria-expanded={isOpen}
      >
        <Languages className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-text-secondary group-hover:text-text transition-colors">
          {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 pt-2 w-48 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="rounded-xl bg-surface border border-border/50 backdrop-blur-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] overflow-hidden animate-fade-in">
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                    language === lang.code
                      ? 'bg-primary/20 text-primary border-l-4 border-primary'
                      : 'text-text-secondary hover:bg-primary/10 hover:text-text'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">
                    {language === 'es' ? lang.labelEs : lang.labelEn}
                  </span>
                  {language === lang.code && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

