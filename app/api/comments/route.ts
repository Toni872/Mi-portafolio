import { NextRequest, NextResponse } from 'next/server'
import { getComments, addComment } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json(
      { error: 'projectId is required' },
      { status: 400 }
    )
  }

  try {
    const comments = await getComments(projectId)
    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Error getting comments:', error)
    return NextResponse.json(
      { error: 'Error obteniendo comentarios' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, visitorId, content } = await request.json()

    if (!projectId || !visitorId || !content) {
      return NextResponse.json(
        { error: 'projectId, visitorId y content son requeridos' },
        { status: 400 }
      )
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: 'El comentario no puede exceder 500 caracteres' },
        { status: 400 }
      )
    }

    await addComment(visitorId, projectId, content)
    const comments = await getComments(projectId)
    const newComment = comments[0] // El más reciente

    return NextResponse.json({ 
      success: true, 
      comment: newComment 
    })
  } catch (error: any) {
    console.error('Error adding comment:', error)
    return NextResponse.json(
      { error: 'Error añadiendo comentario' },
      { status: 500 }
    )
  }
}







