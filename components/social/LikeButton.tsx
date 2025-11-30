'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getVisitorId } from '@/lib/utils'
import { trackLike } from '@/lib/analytics'

interface LikeButtonProps {
  projectId: string
  initialLikes?: number
}

export function LikeButton({ projectId, initialLikes = 0 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const visitorId = getVisitorId()
    
    // Cargar estado inicial
    fetch(`/api/likes?projectId=${projectId}&visitorId=${visitorId}`)
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes || 0)
        setLiked(data.liked || false)
      })
      .catch(console.error)
  }, [projectId])

  const handleLike = async () => {
    if (liked || loading) return

    setLoading(true)
    const visitorId = getVisitorId()

    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, visitorId })
      })

      const data = await response.json()

      if (data.success) {
        setLiked(true)
        setLikes(data.likes)
        trackLike(projectId)
      }
    } catch (error) {
      console.error('Error liking project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          liked ? 'fill-red-500 text-red-500' : 'text-gray-400'
        }`}
      />
      <span className="text-sm">{likes}</span>
    </Button>
  )
}

