'use client'

import { useState, useEffect } from 'react'
import { Trophy, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getVisitorId } from '@/lib/utils'
import { trackAchievementUnlock } from '@/lib/analytics'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_visit',
    name: 'Primera Visita',
    description: 'Visitaste el portafolio por primera vez',
    icon: '🌟',
    unlocked: false
  },
  {
    id: 'view_all_projects',
    name: 'Explorador',
    description: 'Viste todos los proyectos',
    icon: '🔍',
    unlocked: false
  },
  {
    id: 'first_like',
    name: 'Fan',
    description: 'Diste tu primer like',
    icon: '❤️',
    unlocked: false
  },
  {
    id: 'chat_user',
    name: 'Curioso',
    description: 'Hiciste una pregunta al chatbot',
    icon: '💬',
    unlocked: false
  }
]

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS)
  const [showNotification, setShowNotification] = useState<Achievement | null>(null)

  useEffect(() => {
    const visitorId = getVisitorId()
    
    // Verificar logros desbloqueados
    const unlocked = localStorage.getItem(`achievements_${visitorId}`)
    if (unlocked) {
      const unlockedIds = JSON.parse(unlocked)
      setAchievements(prev =>
        prev.map(ach => ({
          ...ach,
          unlocked: unlockedIds.includes(ach.id)
        }))
      )
    }

    // Verificar nuevos logros
    checkAchievements(visitorId)
  }, [])

  const checkAchievements = (visitorId: string) => {
    const actions = JSON.parse(localStorage.getItem(`actions_${visitorId}`) || '[]')
    const unlocked = JSON.parse(localStorage.getItem(`achievements_${visitorId}`) || '[]')

    ACHIEVEMENTS.forEach(achievement => {
      if (unlocked.includes(achievement.id)) return

      let shouldUnlock = false

      switch (achievement.id) {
        case 'first_visit':
          shouldUnlock = actions.includes('visit')
          break
        case 'first_like':
          shouldUnlock = actions.includes('like')
          break
        case 'chat_user':
          shouldUnlock = actions.includes('chat')
          break
      }

      if (shouldUnlock) {
        unlockAchievement(achievement, visitorId)
      }
    })
  }

  const unlockAchievement = (achievement: Achievement, visitorId: string) => {
    const unlocked = JSON.parse(localStorage.getItem(`achievements_${visitorId}`) || '[]')
    unlocked.push(achievement.id)
    localStorage.setItem(`achievements_${visitorId}`, JSON.stringify(unlocked))

    setAchievements(prev =>
      prev.map(ach =>
        ach.id === achievement.id ? { ...ach, unlocked: true } : ach
      )
    )

    setShowNotification(achievement)
    trackAchievementUnlock(achievement.id)

    setTimeout(() => setShowNotification(null), 5000)
  }

  if (!showNotification) return null

  return (
    <Card className="fixed top-6 right-6 w-80 p-4 z-50 animate-slide-up shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="text-4xl">{showNotification.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h4 className="font-semibold text-white">¡Logro Desbloqueado!</h4>
          </div>
          <p className="font-medium text-primary">{showNotification.name}</p>
          <p className="text-sm text-gray-400 mt-1">{showNotification.description}</p>
        </div>
        <button
          onClick={() => setShowNotification(null)}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </Card>
  )
}

