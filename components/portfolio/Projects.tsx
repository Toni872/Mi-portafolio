'use client'

import { Project } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { LikeButton } from '@/components/social/LikeButton'
import { Comments } from '@/components/social/Comments'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { trackProjectView } from '@/lib/analytics'
import { useEffect, useState } from 'react'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  useEffect(() => {
    projects.forEach(project => {
      if (project.id) {
        trackProjectView(project.id, project.title)
      }
    })
  }, [projects])

  const featuredProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Projects
          </h2>

          {/* Featured Project */}
          {featuredProject && (
            <div className="mb-16">
              <Card className="group relative hover:border-primary transition-all duration-500 overflow-hidden bg-gradient-to-br from-surface/50 to-surface hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] border-2 border-border hover:border-primary/50">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="grid md:grid-cols-2 gap-0 relative z-10">
                  {featuredProject.image && (
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Image
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-3xl mb-2 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent group-hover:from-primary-light group-hover:to-accent transition-all duration-300">
                            {featuredProject.title}
                          </CardTitle>
                          <CardDescription className="text-lg text-text-secondary">
                            {featuredProject.subtitle}
                          </CardDescription>
                        </div>
                        {featuredProject.id && <LikeButton projectId={featuredProject.id} />}
                      </div>

                      <p className="text-text-secondary leading-relaxed mb-6">
                        {featuredProject.description}
                      </p>

                      {featuredProject.technologies && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredProject.technologies.slice(0, 6).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-surface/80 backdrop-blur-sm rounded-md text-sm text-text-secondary border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {featuredProject.url && (
                        <Button asChild variant="default" size="sm">
                          <a href={featuredProject.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live app
                          </a>
                        </Button>
                      )}
                      {featuredProject.github && (
                        <Button asChild variant="outline" size="sm">
                          <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Learn more
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <Card
                  key={index}
                  className="group hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  {project.image && (
                    <div className="relative h-48 rounded-t-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{project.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {project.subtitle}
                        </CardDescription>
                      </div>
                      {project.id && <LikeButton projectId={project.id} />}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
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

                    <div className="flex gap-2 pt-2">
                      {project.url && (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live app
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedProject(
                            expandedProject === project.id ? null : (project.id ?? null)
                          )}
                        >
                          {expandedProject === project.id ? 'Ocultar' : 'Ver'} comentarios
                        </Button>
                      )}
                    </div>
                    {project.id && expandedProject === project.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <Comments projectId={project.id} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
