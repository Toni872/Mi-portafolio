'use client'

import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroProps {
  name: string
  skill: string
  about: string
  avatar?: string
}

export function Hero({ name, skill, about, avatar = '/avatar.jpg' }: HeroProps) {
  const { t, language } = useLanguage()
  const [displayedText, setDisplayedText] = useState('')
  const [imageError, setImageError] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const fullText = t.hero.skill
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [fullText])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAvatarClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => setIsClicked(false), 500)
    }, 100)
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg-secondary to-surface opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10 slide-up">
          {/* Avatar Image */}
          <div className="flex justify-center mb-8">
            <div 
              onClick={handleAvatarClick}
              className={`relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-surface transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] cursor-pointer ${
                isClicked 
                  ? 'border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)]' 
                  : 'border-primary/30'
              }`}
            >
              {!imageError ? (
                <img
                  src={avatar.replace(/ /g, '%20')}
                  alt={name}
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                  onError={() => {
                    console.error('Error loading image:', avatar)
                    setImageError(true)
                  }}
                  onLoad={() => setImageError(false)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary/50">
                    {name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Name */}
          <div className="relative">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              {name}
            </h1>
          </div>
          
          {/* Typing Effect */}
          <div className="h-16 flex items-center justify-center">
            <div className="relative">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-text-secondary">
                {displayedText}
                <span className="inline-block w-1 h-10 bg-primary ml-2 animate-pulse"></span>
              </h2>
            </div>
          </div>
          
          {/* Short Description with Better Typography */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
            {(() => {
              const firstSentence = t.about.text.split('.')[0] + '.'
              // Buscar "IA, Python y TypeScript" o "AI, Python and TypeScript" y resaltarlos en rojo
              if (language === 'es') {
                const parts = firstSentence.split(/(IA, Python y TypeScript)/i)
                return parts.map((part, index) => {
                  if (/IA, Python y TypeScript/i.test(part)) {
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
                const parts = firstSentence.split(/(AI, Python and TypeScript)/i)
                return parts.map((part, index) => {
                  if (/AI, Python and TypeScript/i.test(part)) {
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
            })()}
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <a 
              href="#projects" 
              className="group relative px-8 py-4 text-lg font-semibold rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:border-red-400 hover:text-red-400 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">{t.hero.viewWork}</span>
            </a>
            <a 
              href="#contact" 
              className="group relative px-8 py-4 text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">{t.hero.contactMe}</span>
            </a>
            <a 
              href="/cv-harvard.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 text-lg font-semibold rounded-full bg-primary text-dark hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t.hero.downloadCV}
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary transition-all cursor-pointer animate-bounce group"
        aria-label={t.common.scrollToAbout}
      >
        <div className="relative">
          <ArrowDown size={36} className="group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 group-hover:bg-primary/40 transition-colors"></div>
        </div>
      </button>
    </section>
  )
}
