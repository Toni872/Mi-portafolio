'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface AboutProps {
  about: string
  name: string
}

export function About({ about, name }: AboutProps) {
  const { t, language } = useLanguage()
  
  const renderTextWithHighlight = (text: string) => {
    // Buscar "IA, Python y TypeScript" o "AI, Python and TypeScript" y resaltarlos en rojo
    if (language === 'es') {
      const regex = /(IA|Python|TypeScript)/gi
      const parts = text.split(/(IA, Python y TypeScript)/i)
      
      return parts.map((part, index) => {
        if (/IA, Python y TypeScript/i.test(part)) {
          // Resaltar cada palabra en rojo
          const words = part.split(/(, | y )/)
          return (
            <span key={index}>
              <span className="text-red-500 font-semibold">IA</span>
              <span>{words[1]}</span>
              <span className="text-red-500 font-semibold">Python</span>
              <span>{words[3]}</span>
              <span className="text-red-500 font-semibold">TypeScript</span>
            </span>
          )
        }
        return <span key={index}>{part}</span>
      })
    } else {
      const regex = /(AI|Python|TypeScript)/gi
      const parts = text.split(/(AI, Python and TypeScript)/i)
      
      return parts.map((part, index) => {
        if (/AI, Python and TypeScript/i.test(part)) {
          // Resaltar cada palabra en rojo
          const words = part.split(/(, | and )/)
          return (
            <span key={index}>
              <span className="text-red-500 font-semibold">AI</span>
              <span>{words[1]}</span>
              <span className="text-red-500 font-semibold">Python</span>
              <span>{words[3]}</span>
              <span className="text-red-500 font-semibold">TypeScript</span>
            </span>
          )
        }
        return <span key={index}>{part}</span>
      })
    }
  }
  
  return (
    <section id="about" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              {t.about.title}
            </h2>
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent"></div>
          </div>

          <div className="space-y-8">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-surface/50 to-surface border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <p className="text-xl leading-relaxed text-text-secondary">
                {renderTextWithHighlight(t.about.text)}
              </p>
            </div>

            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-surface/30 to-surface/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
              <p className="text-lg leading-relaxed text-text-secondary">
                {t.about.hobby}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
