'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { HeaderMatrixBackground } from '@/components/ui/HeaderMatrixBackground'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  const scrollToSection = (hash: string) => {
    const element = document.querySelector(hash)
    if (element) {
      const headerOffset = typeof window !== 'undefined' && window.innerWidth < 640 ? 64 : 80 // Altura del header (móvil: 64px, desktop: 80px)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navLinks = [
    { href: '/', label: t.nav.home, isHash: false },
    { href: '/#about', label: t.nav.about, isHash: true },
    { href: '/#skills', label: t.nav.skills, isHash: true },
    { href: '/#experience', label: t.nav.experience, isHash: true },
    { href: '/#education', label: t.nav.education, isHash: true },
    { href: '/#projects', label: t.nav.projects, isHash: true },
    { href: '/#contact', label: t.nav.contact, isHash: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Manejar scroll cuando la página carga con un hash
  useEffect(() => {
    const handleHashScroll = () => {
      if (pathname === '/' && window.location.hash) {
        const hash = window.location.hash
        // Esperar a que el DOM esté completamente cargado
        setTimeout(() => {
          scrollToSection(hash)
        }, 300)
      }
    }

    // Ejecutar inmediatamente si ya hay un hash
    handleHashScroll()

    // También escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashScroll)
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [pathname])

  const handleNavClick = (href: string, isHash: boolean, e: React.MouseEvent) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (href === '/') {
      // Si es el link de inicio, navegar a la página principal y scroll al top
      if (pathname !== '/') {
        router.push('/')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (isHash) {
      const hash = href.split('#')[1]
      
      if (pathname === '/') {
        // Si ya estamos en la página principal, solo hacer scroll
        scrollToSection(`#${hash}`)
        // Actualizar el hash en la URL sin recargar
        window.history.pushState(null, '', `#${hash}`)
      } else {
        // Si estamos en otra página, navegar primero y luego hacer scroll
        router.push(`/#${hash}`)
        // El useEffect manejará el scroll cuando la página cargue
      }
    } else {
      // Para otros links sin hash, usar navegación de Next.js
      router.push(href)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-bg/95 backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] border-b border-primary/20'
          : 'bg-transparent'
        }`}
    >
      {isScrolled && <HeaderMatrixBackground isVisible={isScrolled} />}
      <div className="container relative z-10">
        <div className="flex items-center justify-center h-16 sm:h-20">
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href === '/' && pathname === '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, link.isHash, e)}
                  className="group relative px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <span className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-400 group-hover:text-text'
                  }`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"></div>
                  )}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-3/4 transition-all duration-300"></div>
                </Link>
              )
            })}
            <div className="ml-4 pl-4 border-l border-border/50">
              <LanguageSelector />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-3 rounded-lg text-gray-300 hover:text-primary-light hover:bg-primary/10 transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={t.common.toggleMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-border/50">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.isHash && pathname === '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, link.isHash, e)}
                    className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 touch-manipulation min-h-[44px] flex items-center ${
                      isActive
                        ? 'text-primary bg-primary/10 border border-primary/30'
                        : 'text-gray-400 hover:text-text hover:bg-surface/50 active:bg-surface/70'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
