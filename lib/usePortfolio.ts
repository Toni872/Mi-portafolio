import { useLanguage } from '@/contexts/LanguageContext'
import portfolioData from '@/data/portfolio.json'
import { PortfolioData } from '@/types'
import esTranslations from '@/locales/es.json'
import enTranslations from '@/locales/en.json'

const portfolioTranslations = {
  es: {
    skill: 'Ingeniero de Software',
    about: 'Especializado en Python y desarrollo full stack. Experiencia en arquitecturas backend con FastAPI y Node.js, desarrollo frontend con React y Next.js, y gestión de bases de datos PostgreSQL. Especializado en diseño de sistemas escalables, integración de servicios cloud (Supabase, Stripe) y containerización con Docker. Comprometido con la excelencia técnica, código limpio y mejores prácticas de ingeniería de software.',
  },
  en: {
    skill: 'Software Engineer',
    about: 'Software Engineer specialized in Python and full-stack development. Experience in backend architectures with FastAPI and Node.js, frontend development with React and Next.js, and PostgreSQL database management. Specialized in designing scalable systems, cloud service integration (Supabase, Stripe), and containerization with Docker. Committed to technical excellence, clean code, and software engineering best practices.',
  },
}

export function usePortfolio() {
  const { language, t } = useLanguage()
  const data = portfolioData as unknown as PortfolioData
  const translations = portfolioTranslations[language]

  // Traducir proyectos
  const translatedProjects = data.projects.map(project => {
    const projectTranslations = t.projects.details[project.id as keyof typeof t.projects.details]
    if (projectTranslations) {
      return {
        ...project,
        title: projectTranslations.title,
        subtitle: projectTranslations.subtitle,
        description: projectTranslations.description,
      }
    }
    return project
  })

  return {
    ...data,
    skill: translations.skill,
    about: translations.about,
    projects: translatedProjects,
  }
}

