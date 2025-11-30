'use client'

import { Technology } from '@/types'

interface TechStackProps {
  technologies: Technology[]
}

export function TechStack({ technologies }: TechStackProps) {
  // Group technologies by category
  const groupedTech = technologies.reduce((acc, tech) => {
    const category = (tech as any).category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(tech)
    return acc
  }, {} as Record<string, Technology[]>)

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps']

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              Tech Stack
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold text-primary mb-6 relative">
                  {category}
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                </h3>
                <div className="space-y-3">
                  {groupedTech[category]?.map((tech, index) => (
                    <div
                      key={index}
                      className="group relative flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:translate-x-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      <i className={`${tech.icon} text-2xl text-primary-light group-hover:text-primary group-hover:scale-110 transition-all duration-300 relative z-10`}></i>
                      <span className="text-text-secondary group-hover:text-text transition-colors duration-300 relative z-10 font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
