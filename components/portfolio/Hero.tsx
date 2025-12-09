'use client'

import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroProps {
  name: string
  skill: string
  about: string
  avatar?: string
  email?: string
  github?: string
  linkedin?: string
  phone?: string
}

export function Hero({ name, skill, about, avatar = '/avatar.jpg', email, github, linkedin, phone }: HeroProps) {
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

          {/* Social Icons with Official Logos */}
          {(email || github || linkedin || phone) && (
            <div className="flex justify-center items-center gap-4 mb-6">
              {email && (
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-surface/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-surface/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-surface/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="group p-3 rounded-full bg-surface/50 border border-border/50 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 hover:scale-110"
                  aria-label="Phone"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.873.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
          
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
