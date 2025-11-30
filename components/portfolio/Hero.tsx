'use client'

import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'

interface HeroProps {
  name: string
  skill: string
  about: string
}

export function Hero({ name, skill, about }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = skill
  
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
          {/* Name with Glow Effect */}
          <div className="relative">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent">
              {name}
            </h1>
            <div className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary/20 blur-xl -z-10">
              {name}
            </div>
          </div>
          
          {/* Typing Effect with Enhanced Styling */}
          <div className="h-16 flex items-center justify-center">
            <div className="relative">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-text-secondary">
                {displayedText}
                <span className="inline-block w-1 h-10 bg-primary ml-2 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              </h2>
              <div className="absolute inset-0 text-2xl md:text-3xl lg:text-4xl font-semibold text-primary/30 blur-sm -z-10">
                {displayedText}
              </div>
            </div>
          </div>
          
          {/* Short Description with Better Typography */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
            {about.split('.')[0]}.
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <a 
              href="#projects" 
              className="group relative px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-primary-dark text-dark hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Ver mi trabajo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a 
              href="#contact" 
              className="group relative px-8 py-4 text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Contáctame</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary transition-all cursor-pointer animate-bounce group"
        aria-label="Scroll to about section"
      >
        <div className="relative">
          <ArrowDown size={36} className="group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 group-hover:bg-primary/40 transition-colors"></div>
        </div>
      </button>
    </section>
  )
}
