import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Crear cliente solo si las variables están disponibles
// Durante el build, estas variables pueden no estar disponibles, por lo que Supabase será null
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Tipos para la base de datos
export interface Database {
  public: {
    Tables: {
      interactions: {
        Row: {
          id: string
          visitor_id: string
          project_id: string | null
          interaction_type: 'like' | 'comment' | 'view'
          content: string | null
          created_at: string
        }
        Insert: {
          id?: string
          visitor_id: string
          project_id?: string | null
          interaction_type: 'like' | 'comment' | 'view'
          content?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          visitor_id?: string
          project_id?: string | null
          interaction_type?: 'like' | 'comment' | 'view'
          content?: string | null
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          visitor_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          visitor_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          visitor_id?: string
          achievement_id?: string
          unlocked_at?: string
        }
      }
    }
  }
}

// Funciones helper
export async function getProjectLikes(projectId: string): Promise<number> {
  if (!supabase) return 0
  
  const { count } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true })
    .eq('project_id', projectId)
    .eq('interaction_type', 'like')
  
  return count || 0
}

export async function hasVisitorLiked(visitorId: string, projectId: string): Promise<boolean> {
  if (!supabase) return false
  
  const { data } = await supabase
    .from('interactions')
    .select('id')
    .eq('visitor_id', visitorId)
    .eq('project_id', projectId)
    .eq('interaction_type', 'like')
    .limit(1)
  
  return (data?.length || 0) > 0
}

export async function addLike(visitorId: string, projectId: string) {
  if (!supabase) throw new Error('Supabase no está configurado')
  
  const { error } = await supabase
    .from('interactions')
    .insert({
      visitor_id: visitorId,
      project_id: projectId,
      interaction_type: 'like'
    })
  
  if (error) throw error
}

export async function removeLike(visitorId: string, projectId: string) {
  if (!supabase) throw new Error('Supabase no está configurado')
  
  const { error } = await supabase
    .from('interactions')
    .delete()
    .eq('visitor_id', visitorId)
    .eq('project_id', projectId)
    .eq('interaction_type', 'like')
  
  if (error) throw error
}

export async function getComments(projectId: string) {
  if (!supabase) return []
  
  const { data, error } = await supabase
    .from('interactions')
    .select('*')
    .eq('project_id', projectId)
    .eq('interaction_type', 'comment')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function addComment(visitorId: string, projectId: string, content: string) {
  if (!supabase) throw new Error('Supabase no está configurado')
  
  const { error } = await supabase
    .from('interactions')
    .insert({
      visitor_id: visitorId,
      project_id: projectId,
      interaction_type: 'comment',
      content
    })
  
  if (error) throw error
}

export async function trackView(visitorId: string, projectId?: string) {
  if (!supabase) return
  
  await supabase
    .from('interactions')
    .insert({
      visitor_id: visitorId,
      project_id: projectId || null,
      interaction_type: 'view'
    })
}

