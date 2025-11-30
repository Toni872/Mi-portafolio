import { getVisitorId } from './utils'

export interface AnalyticsEvent {
  event: string
  data?: Record<string, any>
  timestamp: string
}

export async function trackEvent(event: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return

  const visitorId = getVisitorId()
  
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        data: {
          ...data,
          visitorId,
          url: window.location.href,
          userAgent: navigator.userAgent,
        },
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export function trackPageView() {
  trackEvent('page_view', {
    path: window.location.pathname,
  })
}

export function trackProjectView(projectId: string, projectTitle: string) {
  trackEvent('project_view', {
    projectId,
    projectTitle,
  })
}

export function trackLike(projectId: string) {
  trackEvent('project_like', {
    projectId,
  })
}

export function trackComment(projectId: string) {
  trackEvent('project_comment', {
    projectId,
  })
}

export function trackAchievementUnlock(achievementId: string) {
  trackEvent('achievement_unlock', {
    achievementId,
  })
}

