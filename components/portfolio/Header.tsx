'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import dynamic from 'next/dynamic'

const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false
})

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-bg/95 backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] border-b border-primary/20'
          : 'bg-transparent'
        }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo with Glow */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#hero')
            }}
            className="group relative text-2xl font-bold text-primary hover:text-primary-light transition-all duration-300"
          >
            <span className="relative z-10">TL</span>
            <span className="absolute inset-0 text-2xl font-bold text-primary/30 blur-md group-hover:text-primary/50 transition-all -z-10">
              TL
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`text-sm font-medium transition-colors hover:text-primary-light ${activeSection === link.href.slice(1)
                    ? 'text-primary-light'
                    : 'text-gray-400'
                  }`}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-primary-light transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className={`text-sm font-medium transition-colors hover:text-primary-light ${activeSection === link.href.slice(1)
                      ? 'text-primary-light'
                      : 'text-gray-400'
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
