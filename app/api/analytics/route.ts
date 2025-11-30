import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Aquí puedes guardar en base de datos, enviar a Google Analytics, etc.
    console.log('Analytics event:', data)
    
    // Ejemplo: Guardar en Supabase si está configurado
    // await supabase.from('analytics').insert(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en analytics:', error)
    return NextResponse.json(
      { error: 'Error guardando analytics' },
      { status: 500 }
    )
  }
}

