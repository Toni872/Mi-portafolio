'use client'

import { Project } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Github, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { trackProjectView } from '@/lib/analytics'
import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const { t } = useLanguage()

  useEffect(() => {
    projects.forEach(project => {
      if (project.id) {
        trackProjectView(project.id, project.title)
      }
    })
  }, [projects])

  return (
    <section id="projects" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              {t.projects.title}
            </h2>
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const projectTranslations = t.projects.details[project.id as keyof typeof t.projects.details]
              return (
                <Card
                  key={project.id || index}
                  className="group hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex flex-col"
                >
                  {project.image && (
                    <div className="relative rounded-t-lg overflow-hidden aspect-video">
                      <Image
                        src={project.image}
                        alt={projectTranslations?.title || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Indicador de video para proyectos que tienen video */}
                      {(project.id === 'sistema-erp' || project.id === 'vilok-project' || project.id === 'tasadiv') && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{projectTranslations?.title || project.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {projectTranslations?.subtitle || project.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-300 leading-relaxed line-clamp-3 mb-4 text-sm">
                      {projectTranslations?.description || project.description}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-surface rounded text-xs text-gray-300 border border-border"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      {project.id && (
                        <Button asChild variant="default" size="sm" className="flex-1 group hover:!text-red-500">
                          <Link 
                            href={`/projects/${project.id}`} 
                            className="group-hover:!text-red-500 transition-colors text-[#0a0f0a]"
                            style={{ color: '#0a0f0a' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#ef4444'
                              const arrow = e.currentTarget.querySelector('svg')
                              if (arrow) arrow.style.color = '#ef4444'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#0a0f0a'
                              const arrow = e.currentTarget.querySelector('svg')
                              if (arrow) arrow.style.color = '#0a0f0a'
                            }}
                          >
                            <span className="text-[#0a0f0a] group-hover:text-red-500">{t.projects.viewDetails}</span>
                            <ArrowRight className="h-4 w-4 ml-2 text-[#0a0f0a] group-hover:text-red-500" />
                          </Link>
                        </Button>
                      )}
                      {project.github && (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
