'use client'

import { useEffect, KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Project } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackProjectView } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const { t } = useLanguage()
  const router = useRouter()

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
              const hasVideo = project.id === 'sistema-erp' || project.id === 'vilok-project' || project.id === 'tasadiv'

              const handleNavigate = () => {
                if (project.id) {
                  router.push(`/projects/${project.id}`)
                }
              }

              const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
                if ((e.key === 'Enter' || e.key === ' ') && project.id) {
                  e.preventDefault()
                  router.push(`/projects/${project.id}`)
                }
              }

              return (
                <Card
                  key={project.id || index}
                  role="button"
                  tabIndex={0}
                  onClick={handleNavigate}
                  onKeyDown={handleKeyDown}
                  className="group relative h-full cursor-pointer overflow-hidden border border-border bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-red-500/80 active:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  {/* Borde animado rojo en hover */}
                  <div className="pointer-events-none absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-[spin_3s_linear_infinite]"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {project.image && (
                      <div className="relative rounded-t-lg overflow-hidden aspect-video">
                        {/* Usar GIF como miniatura si el proyecto tiene video */}
                        {hasVideo ? (
                          <>
                            <img
                              src={
                                project.id === 'sistema-erp'
                                  ? '/videos/thumbnails/erp-demo-thumbnail.gif'
                                  : project.id === 'vilok-project'
                                    ? '/videos/thumbnails/vilok-demo-thumbnail.gif'
                                    : '/videos/thumbnails/tasadiv-demo-thumbnail.gif'
                              }
                              alt={projectTranslations?.title || project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {/* Overlay con icono de play */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Image
                            src={project.image}
                            alt={projectTranslations?.title || project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
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
                        {project.github && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:border-red-500 hover:text-red-400"
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
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
