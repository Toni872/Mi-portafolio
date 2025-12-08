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
    if (loading) return

    setLoading(true)
    const visitorId = getVisitorId()

    try {
      if (liked) {
        // Quitar like
        const response = await fetch(
          `/api/likes?projectId=${projectId}&visitorId=${visitorId}`,
          {
            method: 'DELETE'
          }
        )

        const data = await response.json()

        if (data.success) {
          setLiked(false)
          setLikes(data.likes)
        }
      } else {
        // Dar like
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
      }
    } catch (error) {
      console.error('Error toggling like:', error)
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
      className={`flex items-center gap-2 transition-all duration-200 ${
        liked 
          ? 'hover:bg-red-500/10 hover:text-red-500' 
          : 'hover:bg-gray-500/10 hover:text-gray-300'
      }`}
      title={liked ? 'Quitar like' : 'Dar like'}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-200 ${
          liked 
            ? 'fill-red-500 text-red-500 scale-110' 
            : 'text-gray-400 hover:text-red-400'
        }`}
      />
      <span className={`text-sm transition-colors duration-200 ${
        liked ? 'text-red-500' : 'text-gray-400'
      }`}>
        {likes}
      </span>
    </Button>
  )
}

