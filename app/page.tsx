import { Hero } from '@/components/portfolio/Hero'
import { Header } from '@/components/portfolio/Header'
import { About } from '@/components/portfolio/About'
import { TechStack } from '@/components/portfolio/TechStack'
import { Projects } from '@/components/portfolio/Projects'
import { Contact } from '@/components/portfolio/Contact'
import { Footer } from '@/components/portfolio/Footer'
import { AgentStatus } from '@/components/agents/AgentStatus'
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'
import portfolioData from '@/data/portfolio.json'
import { PortfolioData } from '@/types'

const data = portfolioData as unknown as PortfolioData

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero
          name={data.name}
          skill={data.skill}
          about={data.about}
        />
        <About
          about={data.about}
          name={data.name}
        />
        <TechStack technologies={data.technologies} />
        <Projects projects={data.projects} />
        <section id="agents" className="section">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Sistema de Agentes Autónomos
              </h2>
              <p className="text-gray-400 mb-6 max-w-2xl">
                Monitorea en tiempo real el estado de los agentes de IA que potencian este portafolio.
                Cada agente tiene capacidades especializadas para diferentes tareas.
              </p>
              <AgentStatus />
            </div>
          </div>
        </section>
        <section id="analytics" className="section">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <AnalyticsDashboard />
            </div>
          </div>
        </section>
        <Contact
          email={data.media.email}
          github={data.media.github}
          linkedin={data.media.linkedin}
        />
      </main>
      <Footer />
    </>
  )
}
