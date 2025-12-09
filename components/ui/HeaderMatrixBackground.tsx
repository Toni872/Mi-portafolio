'use client'

import { useEffect, useRef } from 'react'

interface HeaderMatrixBackgroundProps {
  isVisible: boolean
}

export function HeaderMatrixBackground({ isVisible }: HeaderMatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuración más compacta para el header
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    
    // Ajustar tamaño del canvas al header
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 80 // Altura del header
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Array para almacenar la posición Y de cada columna
    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -20
    }

    // Función de animación
    const draw = () => {
      if (!isVisible) return
      
      // Fondo semi-transparente para efecto de rastro
      ctx.fillStyle = 'rgba(10, 15, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Color verde muy sutil pero más visible en el header
      ctx.fillStyle = 'rgba(34, 197, 94, 0.05)'
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      // Dibujar caracteres solo en la altura del header
      for (let i = 0; i < drops.length; i++) {
        // Carácter aleatorio
        const text = chars[Math.floor(Math.random() * chars.length)]
        
        // Posición Y
        const y = drops[i] * fontSize
        
        // Solo dibujar si está en el viewport del header
        if (y > 0 && y < canvas.height) {
          ctx.fillText(text, i * fontSize, y)
        }

        // Resetear cuando llega al final más rápido
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0
        }

        // Mover hacia abajo
        drops[i]++
      }
    }

    // Iniciar animación
    const interval = setInterval(draw, 60)

    // Cleanup
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 0 }}
    />
  )
}







