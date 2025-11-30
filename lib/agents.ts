// Client para interactuar con el sistema de agentes autónomos

const AGENTS_API_URL = process.env.NEXT_PUBLIC_AGENTS_API_URL || 'http://localhost:3001'

export interface Agent {
  id: string
  name: string
  status: 'idle' | 'working' | 'error' | 'offline'
  tasksCompleted: number
  tasksFailed: number
  uptime: number
  lastActivity: string
  currentTask?: {
    id: string
    type: string
  }
  memoryStats: {
    total: number
    byType: Record<string, number>
  }
}

export interface AgentTask {
  type: string
  payload: {
    prompt?: string
    url?: string
    code?: string
    [key: string]: any
  }
}

export interface TaskResponse {
  jobId: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  result?: any
  error?: string
}

/**
 * Obtiene todos los agentes disponibles
 */
export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await fetch(`${AGENTS_API_URL}/api/agents`)
    if (!response.ok) throw new Error('Failed to fetch agents')
    return await response.json()
  } catch (error) {
    console.error('Error fetching agents:', error)
    return []
  }
}

/**
 * Obtiene estadísticas del pool de agentes
 */
export async function getAgentPoolStats() {
  try {
    const response = await fetch(`${AGENTS_API_URL}/api/agents/pool/stats`)
    if (!response.ok) throw new Error('Failed to fetch pool stats')
    return await response.json()
  } catch (error) {
    console.error('Error fetching pool stats:', error)
    return null
  }
}

/**
 * Crea una tarea para los agentes
 */
export async function createAgentTask(task: AgentTask): Promise<TaskResponse> {
  try {
    const response = await fetch(`${AGENTS_API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create task')
    }
    
    return await response.json()
  } catch (error: any) {
    console.error('Error creating task:', error)
    throw error
  }
}

/**
 * Analiza un proyecto usando el agente de investigación
 */
export async function analyzeProjectWithAI(projectTitle: string, projectDescription: string): Promise<string> {
  try {
    const task = await createAgentTask({
      type: 'research',
      payload: {
        prompt: `Analiza este proyecto del portafolio y proporciona insights técnicos detallados:

Título: ${projectTitle}
Descripción: ${projectDescription}

Proporciona:
1. Tecnologías clave utilizadas
2. Desafíos técnicos que probablemente enfrentó
3. Mejores prácticas aplicadas
4. Impacto y escalabilidad del proyecto
5. Recomendaciones de mejora

Mantén la respuesta profesional y técnica.`
      }
    })
    
    // En una implementación real, esperaríamos a que la tarea se complete
    // Por ahora retornamos un mensaje informativo
    return `Análisis iniciado. Job ID: ${task.jobId}. El agente de investigación está procesando tu solicitud...`
  } catch (error: any) {
    return `Error al analizar proyecto: ${error.message}`
  }
}

/**
 * Genera código de ejemplo usando el agente codificador
 */
export async function generateCodeExample(description: string, language: string = 'typescript'): Promise<string> {
  try {
    const task = await createAgentTask({
      type: 'code',
      payload: {
        prompt: `Genera código de ejemplo en ${language} para: ${description}`,
        language
      }
    })
    
    return `Generación de código iniciada. Job ID: ${task.jobId}. El agente codificador está trabajando...`
  } catch (error: any) {
    return `Error al generar código: ${error.message}`
  }
}

/**
 * Captura un screenshot de una URL usando el agente visual
 */
export async function captureScreenshot(url: string): Promise<string> {
  try {
    const task = await createAgentTask({
      type: 'visual',
      payload: {
        prompt: `Captura un screenshot de ${url}`,
        url
      }
    })
    
    return `Screenshot iniciado. Job ID: ${task.jobId}. El agente visual está capturando...`
  } catch (error: any) {
    return `Error al capturar screenshot: ${error.message}`
  }
}

