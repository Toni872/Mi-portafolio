'use client'

import { Technology } from '@/types'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface TechStackProps {
  technologies: Technology[]
}

// Tecnologías principales con sus logos oficiales desde CDN
const mainTechnologies = [
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6'
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB'
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#000000'
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB'
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#336791'
  },
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ED'
  }
]

export function TechStack({ technologies }: TechStackProps) {
  const { t } = useLanguage()
  // Duplicar el array para crear efecto infinito
  const duplicatedTech = [...mainTechnologies, ...mainTechnologies]

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              {t.nav.skills}
            </h2>
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent"></div>
          </div>

          {/* Animated Carousel */}
          <div className="relative overflow-hidden py-8">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex tech-scroll-animation">
              {duplicatedTech.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 mx-6 group"
                >
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] min-w-[140px] hover:scale-110 hover:-translate-y-2">
                    <div 
                      className="mb-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 relative w-16 h-16 flex items-center justify-center"
                    >
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.3))' }}
                      />
                    </div>
                    <span className="text-text-secondary group-hover:text-text transition-colors duration-300 font-semibold text-sm">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
