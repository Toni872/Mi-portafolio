'use client'

interface AboutProps {
  about: string
  name: string
}

export function About({ about, name }: AboutProps) {
  return (
    <section id="about" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              Sobre mí
            </h2>
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent"></div>
          </div>

          <div className="space-y-8">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-surface/50 to-surface border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <p className="text-xl leading-relaxed text-text-secondary">
                {about}
              </p>
            </div>

            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-surface/30 to-surface/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
              <p className="text-lg leading-relaxed text-text-secondary">
                Cuando no estoy programando, me encontrarás explorando nuevas tecnologías,
                contribuyendo a proyectos open source, o compartiendo conocimiento con la comunidad de desarrolladores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
