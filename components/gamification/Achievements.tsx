'use client'

import { useState, useEffect } from 'react'
import { Trophy, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getVisitorId } from '@/lib/utils'
import { trackAchievementUnlock } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}

function getAchievements(t: any): Achievement[] {
  return [
    {
      id: 'first_visit',
      name: t.achievements.firstVisit.name,
      description: t.achievements.firstVisit.description,
      icon: '🌟',
      unlocked: false
    },
    {
      id: 'view_all_projects',
      name: t.achievements.explorer.name,
      description: t.achievements.explorer.description,
      icon: '🔍',
      unlocked: false
    }
  ]
}

export function Achievements() {
  const { t } = useLanguage()
  const [achievements, setAchievements] = useState<Achievement[]>(getAchievements(t))
  const [showNotification, setShowNotification] = useState<Achievement | null>(null)

  useEffect(() => {
    const visitorId = getVisitorId()
    const currentAchievements = getAchievements(t)
    
    // Verificar logros desbloqueados
    const unlocked = localStorage.getItem(`achievements_${visitorId}`)
    if (unlocked) {
      const unlockedIds = JSON.parse(unlocked)
      setAchievements(
        currentAchievements.map(ach => ({
          ...ach,
          unlocked: unlockedIds.includes(ach.id)
        }))
      )
    }

    // Verificar nuevos logros
    checkAchievements(visitorId, currentAchievements)
  }, [t])

  const checkAchievements = (visitorId: string, achievementsList: Achievement[]) => {
    const actions = JSON.parse(localStorage.getItem(`actions_${visitorId}`) || '[]')
    const unlocked = JSON.parse(localStorage.getItem(`achievements_${visitorId}`) || '[]')

    achievementsList.forEach(achievement => {
      if (unlocked.includes(achievement.id)) return

      let shouldUnlock = false

      switch (achievement.id) {
        case 'first_visit':
          shouldUnlock = actions.includes('visit')
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

    // Usar el achievement actualizado con las traducciones correctas
    const currentAchievements = getAchievements(t)
    const updatedAchievement = currentAchievements.find(a => a.id === achievement.id) || achievement
    setShowNotification(updatedAchievement)
    trackAchievementUnlock(achievement.id)

    setTimeout(() => setShowNotification(null), 5000)
  }

  // Actualizar notificación cuando cambie el idioma
  useEffect(() => {
    if (showNotification) {
      const currentAchievements = getAchievements(t)
      const updatedAchievement = currentAchievements.find(a => a.id === showNotification.id)
      if (updatedAchievement) {
        setShowNotification(updatedAchievement)
      }
    }
  }, [t, showNotification?.id])

  if (!showNotification) return null

  return (
    <Card className="fixed top-6 right-6 w-80 p-4 z-50 animate-slide-up shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="text-4xl">{showNotification.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h4 className="font-semibold text-white">{t.achievements.unlocked}</h4>
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

