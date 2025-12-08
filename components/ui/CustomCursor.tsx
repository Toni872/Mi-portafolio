'use client'

import { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const isReadyRef = useRef(false)

  useEffect(() => {
    // Verificar si es escritorio
    const checkDesktop = () => {
      const desktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768
      setIsDesktop(desktop)
      return desktop
    }

    setIsMounted(true)
    const desktop = checkDesktop()
    
    if (!desktop) {
      // Restaurar cursor normal en móviles
      document.documentElement.style.cursor = 'auto'
      document.body.style.cursor = 'auto'
      return
    }

    // Asegurar que el cursor del sistema esté visible inicialmente
    document.documentElement.style.cursor = 'auto'
    document.body.style.cursor = 'auto'

    // Variables para los event listeners
    let observer: MutationObserver | null = null
    let initTimer: NodeJS.Timeout | null = null

    // Solo ocultar el cursor del sistema cuando el componente esté listo
    const hideSystemCursor = () => {
      if (isReadyRef.current) {
        document.documentElement.style.cursor = 'none'
        document.body.style.cursor = 'none'
      }
    }

    // Esperar un pequeño delay para asegurar que el componente esté completamente renderizado
    initTimer = setTimeout(() => {
      isReadyRef.current = true
      setIsReady(true)
      
      hideSystemCursor()

      // Inicializar posición del cursor en el centro de la pantalla
      setPosition({ 
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2 
      })
      setIsVisible(true)

      // Observer para detectar nuevos elementos añadidos al DOM y aplicar cursor: none
      observer = new MutationObserver(() => {
        hideSystemCursor()
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }, 100) // Delay para asegurar que el componente esté renderizado

    // Actualizar posición del cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (isReadyRef.current) {
        setPosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      }
    }

    // Detectar cuando el mouse sale de la ventana
    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    // Detectar cuando el mouse entra a la ventana
    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detectar elementos interactivos
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Elementos interactivos tradicionales
      const isTraditionalInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.hasAttribute('role') && target.getAttribute('role') === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        target.classList.contains('cursor-pointer')
      
      // Verificar estilo del cursor
      const computedStyle = window.getComputedStyle(target)
      const hasPointerCursor = computedStyle.cursor === 'pointer'
      
      // Verificar si tiene transiciones o animaciones CSS
      const hasTransition = computedStyle.transition !== 'all 0s ease 0s' && 
                           computedStyle.transition !== 'none' &&
                           (computedStyle.transition.includes('transform') || 
                           computedStyle.transition.includes('opacity') ||
                           computedStyle.transition.includes('scale'))
      
      // Verificar clases comunes de elementos interactivos/animated
      const hasInteractiveClasses = 
        target.classList.contains('transition') ||
        target.classList.contains('hover:scale') ||
        target.classList.contains('hover:opacity') ||
        target.classList.contains('group') ||
        target.closest('.transition') !== null ||
        target.closest('.group') !== null ||
        target.closest('[class*="hover:"]') !== null ||
        target.closest('[class*="transition"]') !== null ||
        target.closest('[class*="card"]') !== null ||
        target.closest('[class*="project"]') !== null
      
      // Verificar si es clickeable
      const isClickable = 
        target.onclick !== null ||
        target.getAttribute('onclick') !== null ||
        target.closest('[onclick]') !== null
      
      const isInteractive = 
        isTraditionalInteractive || 
        hasPointerCursor ||
        hasTransition ||
        hasInteractiveClasses ||
        isClickable
      
      setIsHovering(isInteractive)
    }

    // Detectar cuando se hace clic
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true)
    }

    const handleMouseUp = (e: MouseEvent) => {
      setIsClicked(false)
    }

    // Manejar cambios de tamaño de ventana
    const handleResize = () => {
      const desktop = checkDesktop()
      setIsDesktop(desktop)
      if (!desktop) {
        document.documentElement.style.cursor = 'auto'
        document.body.style.cursor = 'auto'
      } else if (isReadyRef.current) {
        hideSystemCursor()
      }
    }

    // Agregar event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('resize', handleResize)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Cleanup function
    return () => {
      if (initTimer) {
        clearTimeout(initTimer)
      }
      if (observer) {
        observer.disconnect()
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      // SIEMPRE restaurar el cursor del sistema al desmontar
      isReadyRef.current = false
      document.documentElement.style.cursor = 'auto'
      document.body.style.cursor = 'auto'
    }
  }, [])

  // No renderizar hasta que esté montado (evitar problemas de SSR)
  if (!isMounted) {
    return null
  }

  // No renderizar en móviles
  if (!isDesktop) {
    return null
  }

  // No renderizar hasta que esté completamente listo
  if (!isReady) {
    return null
  }

  const cursorColor = '#22c55e' // Verde

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(2px, 2px)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flecha estilo Windows - puntero hacia arriba-izquierda */}
        {/* Contorno blanco para mejor visibilidad */}
        <path
          d="M1 1L1 14L6 9L11 18L15 13L10 9L15 1L1 1Z"
          fill="white"
          stroke="black"
          strokeWidth="0.5"
        />
        {/* Flecha verde principal */}
        <path
          d="M1.5 1.5L1.5 13.5L6 9L10.5 17L14.5 13L10 9L14.5 1.5L1.5 1.5Z"
          fill={cursorColor}
        />
      </svg>
    </div>
  )
}
