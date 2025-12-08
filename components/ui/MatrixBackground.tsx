'use client'

import { useEffect, useRef } from 'react'

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuración
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = Math.floor(window.innerWidth / fontSize)
    
    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Array para almacenar la posición Y de cada columna
    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100
    }

    // Función de animación
    const draw = () => {
      // Fondo semi-transparente para efecto de rastro
      ctx.fillStyle = 'rgba(10, 15, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Color verde muy sutil
      ctx.fillStyle = 'rgba(34, 197, 94, 0.03)'
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      // Dibujar caracteres
      for (let i = 0; i < drops.length; i++) {
        // Carácter aleatorio
        const text = chars[Math.floor(Math.random() * chars.length)]
        
        // Posición Y
        const y = drops[i] * fontSize
        
        // Solo dibujar si está en el viewport
        if (y > 0 && y < canvas.height) {
          ctx.fillText(text, i * fontSize, y)
        }

        // Resetear cuando llega al final
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Mover hacia abajo
        drops[i]++
      }
    }

    // Iniciar animación
    const interval = setInterval(draw, 50)

    // Cleanup
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.03]"
      style={{ zIndex: 0 }}
    />
  )
}

