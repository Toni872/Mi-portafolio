'use client'

import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/portfolio/Header'
import { Footer } from '@/components/portfolio/Footer'
import { usePortfolio } from '@/lib/usePortfolio'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Comments } from '@/components/social/Comments'
import { Github, ArrowLeft, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { trackProjectView } from '@/lib/analytics'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()
  const portfolio = usePortfolio()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  const projectId = params.id as string
  const project = portfolio.projects.find(p => p.id === projectId)
  const isERPProject = projectId === 'sistema-erp'
  const isVilokProject = projectId === 'vilok-project'
  const isTasaDivProject = projectId === 'tasadiv'

  useEffect(() => {
    if (project?.id) {
      trackProjectView(project.id, project.title)
    }
  }, [project])

  if (!project) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center py-20">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">{t.projects.notFound}</h1>
              <Button onClick={() => router.push('/')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.common.backHome}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const projectTranslations = t.projects.details[projectId as keyof typeof t.projects.details]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto py-12">
            {/* Back Button */}
            <Button
              onClick={() => router.push('/#projects')}
              variant="ghost"
              className="mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.common.backToProjects}
            </Button>

            {/* Project Header */}
            <div className="mb-12">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent px-4 sm:px-0">
                    {projectTranslations?.title || project.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 px-4 sm:px-0">
                    {projectTranslations?.subtitle || project.subtitle}
                  </p>
                </div>
              </div>

              {/* Project Image or Video */}
              {project.image && (
                <div className={`relative w-full rounded-lg overflow-hidden mb-8 border-2 border-border ${(isERPProject || isVilokProject || isTasaDivProject) ? 'aspect-video max-h-[300px] sm:max-h-[400px] md:max-h-[600px]' : 'h-64 sm:h-80 md:h-96'}`}>
                  {(isERPProject || isVilokProject || isTasaDivProject) && !isVideoPlaying ? (
                    <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                      {/* GIF como miniatura del video */}
                      <img
                        src={
                          isERPProject
                            ? "/videos/thumbnails/erp-demo-thumbnail.gif"
                            : isVilokProject
                              ? "/videos/thumbnails/vilok-demo-thumbnail.gif"
                              : "/videos/thumbnails/tasadiv-demo-thumbnail.gif"
                        }
                        alt={project.title}
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                      {/* Video oculto para preload */}
                      <video
                        src={
                          isERPProject
                            ? "/videos/erp-demo.mp4"
                            : isVilokProject
                              ? "/videos/vilok-demo.mp4"
                              : "/videos/tasadiv-demo.mp4"
                        }
                        className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none"
                        preload="metadata"
                        muted
                        playsInline
                        onError={(e) => {
                          // Si el video no está disponible, ocultarlo completamente
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Overlay con botón de play */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-4 sm:p-6 group-hover:scale-110 transition-transform duration-300 shadow-lg touch-manipulation">
                          <Play className="h-8 w-8 sm:h-12 sm:w-12 text-gray-900 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  ) : (isERPProject || isVilokProject || isTasaDivProject) && isVideoPlaying ? (
                    <video
                      src={
                        isERPProject
                          ? "/videos/erp-demo.mp4"
                          : isVilokProject
                            ? "/videos/vilok-demo.mp4"
                            : "/videos/tasadiv-demo.mp4"
                      }
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      playsInline
                      onEnded={() => setIsVideoPlaying(false)}
                      onError={() => {
                        // Si el video no está disponible, volver a la imagen
                        setIsVideoPlaying(false)
                      }}
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                {project.github && (
                  <Button asChild variant="outline" size="lg">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 mr-2" />
                      {t.projects.code}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.projects.description}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {projectTranslations?.description || project.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.projects.technologies}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-surface/80 backdrop-blur-sm rounded-md text-sm text-text-secondary border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Comments Section */}
                {project.id && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.comments.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Comments projectId={project.id} />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                {project.stats && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.projects.stats}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(project.stats).map(([key, value]) => {
                          const label =
                            language === 'es'
                              ? key === 'bundle'
                                ? 'Bundle'
                                : key === 'load'
                                  ? 'Carga'
                                  : key === 'api'
                                    ? 'API'
                                    : key === 'browsers'
                                      ? 'Navegadores'
                                      : key
                              : key.charAt(0).toUpperCase() + key.slice(1)

                          return (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-gray-400">{label}:</span>
                              <span className="text-primary font-semibold">{value}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Project Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.projects.info}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.id && (
                      <div>
                        <span className="text-gray-400 text-sm">ID:</span>
                        <p className="text-text font-mono text-sm">{project.id}</p>
                      </div>
                    )}
                    {project.github && (
                      <div>
                        <span className="text-gray-400 text-sm">{t.projects.repository}:</span>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline block truncate"
                        >
                          {project.github}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

