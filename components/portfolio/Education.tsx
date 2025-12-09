'use client'

import { GraduationCap, BookOpen, Calendar, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'

interface TrainingItem {
  id?: string
  icon?: string
  certificate?: string
}

interface EducationProps {
  training: TrainingItem[]
}

const iconMap: Record<string, typeof GraduationCap> = {
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
}

export function Education({ training }: EducationProps) {
  const { t } = useLanguage()

  if (!training || training.length === 0) return null

  const educationItems = training
    .filter(item => item.id)
    .map(item => ({
      id: item.id!,
      icon: item.icon || 'book-open',
      certificate: item.certificate,
      ...t.education.items[item.id! as keyof typeof t.education.items]
    }))
    .filter(item => item.title)

  if (educationItems.length === 0) return null

  return (
    <section id="education" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              {t.education.title}
            </h2>
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent"></div>
          </div>

          <div className="space-y-6">
            {educationItems.map((item, index) => {
              const IconComponent = iconMap[item.icon] || BookOpen
              
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 bg-gradient-to-br from-surface/50 to-surface border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-xl font-semibold text-text">{item.title}</h3>
                            {item.certificate && (
                              <a
                                href={item.certificate}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-1.5 rounded-md text-primary hover:text-primary-light hover:bg-primary/20 transition-all duration-200 hover:scale-110 border border-primary/30 hover:border-primary/50"
                                title="Ver certificado"
                              >
                                <ExternalLink className="h-5 w-5" strokeWidth={2.5} />
                              </a>
                            )}
                          </div>
                          <p className="text-lg font-medium text-primary-light mb-2">{item.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

