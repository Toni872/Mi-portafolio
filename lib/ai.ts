import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro',
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
  }
})

const PORTFOLIO_CONTEXT = `
Eres un asistente virtual del portafolio de Antonio Lloret Sánchez, un Desarrollador Full-Stack especializado en React, Next.js, NestJS y Python.

INFORMACIÓN DEL PORTAFOLIO:
- Nombre: Antonio Lloret Sánchez
- Ubicación: España
- Especialización: Desarrollador Full-Stack | React | Next.js | NestJS
- Email: antonio.lloret@example.com
- GitHub: https://github.com/Toni872
- LinkedIn: https://www.linkedin.com/in/antonio-lloret-sánchez-080166156/

PROYECTOS DESTACADOS:
1. VilokProject - Marketplace de espacios con Next.js 14, TypeScript, Supabase, Stripe
2. Sistema ERP Empresarial - ERP completo con NestJS, GraphQL, React 18, PostgreSQL

TECNOLOGÍAS PRINCIPALES:
Python, React, TypeScript, PostgreSQL, Docker, Git, Node.js, FastAPI

INSTRUCCIONES:
- Responde de forma profesional pero amigable
- Si no sabes algo, admítelo honestamente
- Mantén las respuestas concisas pero informativas
- Puedes hablar sobre proyectos, tecnologías, experiencia y habilidades
- Siempre ofrece información relevante sobre el portafolio
`

export async function chatWithPortfolio(question: string): Promise<string> {
  try {
    const prompt = `${PORTFOLIO_CONTEXT}\n\nPregunta del visitante: ${question}\n\nRespuesta:`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error en chat con IA:', error)
    return 'Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo más tarde.'
  }
}

export async function analyzeProject(projectTitle: string, projectDescription: string): Promise<string> {
  try {
    const prompt = `
Analiza este proyecto del portafolio y proporciona insights técnicos:

Título: ${projectTitle}
Descripción: ${projectDescription}

Proporciona:
1. Tecnologías clave utilizadas
2. Desafíos técnicos que probablemente enfrentó
3. Mejores prácticas aplicadas
4. Impacto y escalabilidad del proyecto

Mantén la respuesta profesional y técnica.
`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error analizando proyecto:', error)
    return 'No pude analizar el proyecto en este momento.'
  }
}

