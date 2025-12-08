'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, User } from 'lucide-react'
import { getComments, addComment } from '@/lib/supabase'
import { getVisitorId } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'

interface Comment {
  id: string
  visitor_id: string
  content: string
  created_at: string
}

interface CommentsProps {
  projectId: string
}

export function Comments({ projectId }: CommentsProps) {
  const { t, language } = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadComments()
  }, [projectId])

  const loadComments = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/comments?projectId=${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error('Error loading comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || submitting) return

    setSubmitting(true)
    const visitorId = getVisitorId()

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          visitorId,
          content: newComment.trim()
        })
      })

      if (response.ok) {
        const data = await response.json()
        setComments(prev => [data.comment, ...prev])
        setNewComment('')
        trackEvent('comment_added', { projectId })
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return t.comments.now
    if (minutes < 60) {
      const plural = minutes > 1 ? (language === 'es' ? 's' : 's') : ''
      if (language === 'es') {
        return `Hace ${minutes} minuto${plural}`
      } else {
        return `${minutes} minute${plural} ago`
      }
    }
    if (hours < 24) {
      const plural = hours > 1 ? (language === 'es' ? 's' : 's') : ''
      if (language === 'es') {
        return `Hace ${hours} hora${plural}`
      } else {
        return `${hours} hour${plural} ago`
      }
    }
    if (days < 7) {
      const plural = days > 1 ? (language === 'es' ? 's' : 's') : ''
      if (language === 'es') {
        return `Hace ${days} día${plural}`
      } else {
        return `${days} day${plural} ago`
      }
    }
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const getVisitorInitial = (visitorId: string) => {
    return visitorId.charAt(0).toUpperCase()
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t.comments.title} ({comments.length})</h3>
      </div>

      {/* Formulario de comentario */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t.comments.placeholder}
            className="flex-1"
            maxLength={500}
          />
          <Button
            type="submit"
            disabled={!newComment.trim() || submitting}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {newComment.length}/500 {t.comments.characters}
        </p>
      </form>

      {/* Lista de comentarios */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>{t.comments.noComments}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-300">
                    {t.comments.visitor} {getVisitorInitial(comment.visitor_id)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

