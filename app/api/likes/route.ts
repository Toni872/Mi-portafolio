import { NextRequest, NextResponse } from 'next/server'
import { getProjectLikes, hasVisitorLiked, addLike, removeLike } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const projectId = searchParams.get('projectId')
  const visitorId = searchParams.get('visitorId')

  if (!projectId) {
    return NextResponse.json(
      { error: 'projectId is required' },
      { status: 400 }
    )
  }

  try {
    const likes = await getProjectLikes(projectId)
    const liked = visitorId ? await hasVisitorLiked(visitorId, projectId) : false

    return NextResponse.json({ likes, liked })
  } catch (error) {
    console.error('Error getting likes:', error)
    return NextResponse.json(
      { error: 'Error obteniendo likes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, visitorId } = await request.json()

    if (!projectId || !visitorId) {
      return NextResponse.json(
        { error: 'projectId and visitorId are required' },
        { status: 400 }
      )
    }

    const alreadyLiked = await hasVisitorLiked(visitorId, projectId)
    if (alreadyLiked) {
      return NextResponse.json({ error: 'Ya has dado like' }, { status: 400 })
    }

    await addLike(visitorId, projectId)
    const likes = await getProjectLikes(projectId)

    return NextResponse.json({ success: true, likes, liked: true })
  } catch (error) {
    console.error('Error adding like:', error)
    return NextResponse.json(
      { error: 'Error añadiendo like' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')
    const visitorId = searchParams.get('visitorId')

    if (!projectId || !visitorId) {
      return NextResponse.json(
        { error: 'projectId and visitorId are required' },
        { status: 400 }
      )
    }

    const alreadyLiked = await hasVisitorLiked(visitorId, projectId)
    if (!alreadyLiked) {
      return NextResponse.json({ error: 'No has dado like' }, { status: 400 })
    }

    await removeLike(visitorId, projectId)
    const likes = await getProjectLikes(projectId)

    return NextResponse.json({ success: true, likes, liked: false })
  } catch (error) {
    console.error('Error removing like:', error)
    return NextResponse.json(
      { error: 'Error quitando like' },
      { status: 500 }
    )
  }
}

