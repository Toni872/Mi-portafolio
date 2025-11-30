import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const range = searchParams.get('range') || '30d'

  try {
    // Calcular fecha de inicio según el rango
    const now = new Date()
    let startDate = new Date()
    
    if (range === '7d') {
      startDate.setDate(now.getDate() - 7)
    } else if (range === '30d') {
      startDate.setDate(now.getDate() - 30)
    } else {
      startDate = new Date(0) // Todo el tiempo
    }

    // Obtener todas las interacciones
    const { data: interactions, error } = await supabase
      .from('interactions')
      .select('*')
      .gte('created_at', startDate.toISOString())

    if (error) throw error

    // Calcular estadísticas
    const totalViews = interactions?.filter(i => i.interaction_type === 'view').length || 0
    const totalLikes = interactions?.filter(i => i.interaction_type === 'like').length || 0
    const totalComments = interactions?.filter(i => i.interaction_type === 'comment').length || 0
    
    // Visitantes únicos
    const uniqueVisitors = new Set(interactions?.map(i => i.visitor_id) || []).size

    // Estadísticas por proyecto
    const projectStatsMap = new Map<string, { views: number; likes: number; comments: number; projectTitle: string }>()
    
    interactions?.forEach(interaction => {
      if (!interaction.project_id) return
      
      if (!projectStatsMap.has(interaction.project_id)) {
        projectStatsMap.set(interaction.project_id, {
          views: 0,
          likes: 0,
          comments: 0,
          projectTitle: interaction.project_id
        })
      }
      
      const stats = projectStatsMap.get(interaction.project_id)!
      if (interaction.interaction_type === 'view') stats.views++
      if (interaction.interaction_type === 'like') stats.likes++
      if (interaction.interaction_type === 'comment') stats.comments++
    })

    const projectStats = Array.from(projectStatsMap.entries()).map(([projectId, stats]) => ({
      projectId,
      projectTitle: stats.projectTitle,
      views: stats.views,
      likes: stats.likes,
      comments: stats.comments
    })).sort((a, b) => (b.views + b.likes + b.comments) - (a.views + a.likes + a.comments))

    // Actividad reciente
    const recentActivity = interactions
      ?.slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
      .map(i => ({
        type: i.interaction_type,
        projectId: i.project_id,
        timestamp: i.created_at
      })) || []

    return NextResponse.json({
      totalViews,
      totalLikes,
      totalComments,
      uniqueVisitors,
      projectStats,
      recentActivity
    })
  } catch (error: any) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Error obteniendo analytics' },
      { status: 500 }
    )
  }
}

