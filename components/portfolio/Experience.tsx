'use client'

import { Briefcase, Calendar } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'

interface ExperienceItem {
  id?: string
}

interface ExperienceProps {
  experience: ExperienceItem[]
}

export function Experience({ experience }: ExperienceProps) {
  const { t } = useLanguage()

  if (!experience || experience.length === 0) return null

  const experienceItems = experience
    .filter(exp => exp.id)
    .map(exp => ({
      id: exp.id!,
      ...t.experience.items[exp.id! as keyof typeof t.experience.items]
    }))
    .filter(exp => exp.company)

  if (experienceItems.length === 0) return null

  return (
    <section id="experience" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              {t.experience.title}
            </h2>
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent"></div>
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {experienceItems.map((exp, index) => (
              <Card
                key={index}
                className="p-4 sm:p-5 md:p-6 lg:p-8 bg-gradient-to-br from-surface/50 to-surface border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text break-words">{exp.company}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm break-words">{exp.period}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4 leading-relaxed">{exp.description}</p>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                    <h4 className="text-xs sm:text-sm font-semibold text-text-secondary mb-2 sm:mb-3 uppercase tracking-wide">
                      {t.experience.responsibilities}
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                          <span className="text-primary mt-1 sm:mt-1.5 flex-shrink-0">•</span>
                          <span className="break-words">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

