import { NextRequest, NextResponse } from 'next/server'
import { chatWithPortfolio } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { 
          response: 'Lo siento, el servicio de IA no está configurado. Por favor, configura GEMINI_API_KEY en las variables de entorno.'
        },
        { status: 200 }
      )
    }

    const response = await chatWithPortfolio(question)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error en API chat:', error)
    return NextResponse.json(
      { error: 'Error procesando la pregunta' },
      { status: 500 }
    )
  }
}

