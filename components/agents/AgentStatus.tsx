'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { getAgents, getAgentPoolStats, Agent } from '@/lib/agents'
import { Activity, CheckCircle2, AlertCircle, Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AgentStatus() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [poolStats, setPoolStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAgentData()
    const interval = setInterval(loadAgentData, 5000) // Actualizar cada 5 segundos
    return () => clearInterval(interval)
  }, [])

  const loadAgentData = async () => {
    try {
      const [agentsData, statsData] = await Promise.all([
        getAgents(),
        getAgentPoolStats()
      ])
      setAgents(agentsData)
      setPoolStats(statsData)
    } catch (error) {
      console.error('Error loading agent data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle':
        return 'text-green-500'
      case 'working':
        return 'text-blue-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'idle':
        return <CheckCircle2 className="h-4 w-4" />
      case 'working':
        return <Activity className="h-4 w-4 animate-pulse" />
      case 'error':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    )
  }

  if (agents.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-400 text-sm">
          Sistema de agentes no disponible. Asegúrate de que el backend esté corriendo en {process.env.NEXT_PUBLIC_AGENTS_API_URL || 'http://localhost:3001'}
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Sistema de Agentes Autónomos</h3>
      </div>

      {poolStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{poolStats.total}</div>
            <div className="text-xs text-gray-400">Total Agentes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{poolStats.idle}</div>
            <div className="text-xs text-gray-400">Disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{poolStats.working}</div>
            <div className="text-xs text-gray-400">Trabajando</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{poolStats.totalTasksCompleted}</div>
            <div className="text-xs text-gray-400">Tareas Completadas</div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border"
          >
            <div className="flex items-center gap-3">
              <div className={cn('flex items-center gap-2', getStatusColor(agent.status))}>
                {getStatusIcon(agent.status)}
                <span className="text-sm font-medium capitalize">{agent.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>{agent.tasksCompleted} completadas</span>
              {agent.currentTask && (
                <span className="text-blue-400">Trabajando...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

