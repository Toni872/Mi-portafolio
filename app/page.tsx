'use client'

import { Hero } from '@/components/portfolio/Hero'
import { Header } from '@/components/portfolio/Header'
import { About } from '@/components/portfolio/About'
import { TechStack } from '@/components/portfolio/TechStack'
import { Experience } from '@/components/portfolio/Experience'
import { Education } from '@/components/portfolio/Education'
import { Projects } from '@/components/portfolio/Projects'
import { Contact } from '@/components/portfolio/Contact'
import { Footer } from '@/components/portfolio/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePortfolio } from '@/lib/usePortfolio'
import { useEffect } from 'react'

export default function Home() {
  const { t } = useLanguage()
  const portfolio = usePortfolio()

  // Manejar scroll cuando la página carga con un hash
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const hash = window.location.hash
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 500)
      }
    }

    // Ejecutar cuando el componente se monta
    handleHashScroll()

    // También escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashScroll)
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])
  
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero
          name={portfolio.name}
          skill={portfolio.skill}
          about={portfolio.about}
          avatar={portfolio.avatar}
          email={portfolio.media.email}
          github={portfolio.media.github}
          linkedin={portfolio.media.linkedin}
          phone="+34687723287"
        />
        <About
          about={portfolio.about}
          name={portfolio.name}
        />
        <TechStack technologies={portfolio.technologies} />
        <Projects projects={portfolio.projects} />
        <Experience experience={portfolio.experience} />
        <Education training={portfolio.training} />
        <Contact
          email={portfolio.media.email}
          github={portfolio.media.github}
          linkedin={portfolio.media.linkedin}
        />
      </main>
      <Footer />
    </>
  )
}
