'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart3, TrendingUp, Eye, Heart, MessageSquare, Users } from 'lucide-react'

interface AnalyticsData {
  totalViews: number
  totalLikes: number
  totalComments: number
  uniqueVisitors: number
  projectStats: {
    projectId: string
    projectTitle: string
    views: number
    likes: number
    comments: number
  }[]
  recentActivity: {
    type: string
    projectId?: string
    timestamp: string
  }[]
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d')

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics/dashboard?range=${timeRange}`)
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-gray-400">No hay datos de analytics disponibles.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-surface text-gray-400 hover:bg-surface-light'
              }`}
            >
              {range === '7d' ? '7 días' : range === '30d' ? '30 días' : 'Todo'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Eye className="h-5 w-5 text-blue-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{data.totalViews}</div>
          <div className="text-sm text-gray-400">Total de Visitas</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Heart className="h-5 w-5 text-red-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{data.totalLikes}</div>
          <div className="text-sm text-gray-400">Total de Likes</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{data.totalComments}</div>
          <div className="text-sm text-gray-400">Total de Comentarios</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-green-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{data.uniqueVisitors}</div>
          <div className="text-sm text-gray-400">Visitantes Únicos</div>
        </Card>
      </div>

      {/* Project Stats */}
      {data.projectStats.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Estadísticas por Proyecto</h3>
          <div className="space-y-4">
            {data.projectStats.map((project) => (
              <div key={project.projectId} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{project.projectTitle}</h4>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span>{project.views} vistas</span>
                    <span>{project.likes} likes</span>
                    <span>{project.comments} comentarios</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{ width: `${(project.views / data.totalViews) * 100}%` }}
                  />
                  <div
                    className="h-2 bg-red-500 rounded"
                    style={{ width: `${(project.likes / Math.max(data.totalLikes, 1)) * 100}%` }}
                  />
                  <div
                    className="h-2 bg-purple-500 rounded"
                    style={{ width: `${(project.comments / Math.max(data.totalComments, 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

