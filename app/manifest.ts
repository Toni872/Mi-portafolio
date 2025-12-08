import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Antonio Lloret - Portafolio',
    short_name: 'TL Portfolio',
    description: 'Portafolio profesional de Antonio Lloret - Ingeniero de Software & AI Specialist',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0e27',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['portfolio', 'developer', 'technology'],
    orientation: 'portrait-primary',
    lang: 'es-ES'
  }
}

