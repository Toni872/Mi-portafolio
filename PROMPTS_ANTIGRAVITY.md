# 🤖 Prompts Listos para Google Antigravity

Colección de prompts específicos para trabajar con este proyecto en Antigravity.

---

## 🎯 PROMPTS INICIALES

### 1. Explicar el Proyecto Completo

```
Este es un portafolio personal revolucionario con Next.js 14, TypeScript y Tailwind CSS.

Tecnologías principales:
- Next.js 14 con App Router
- TypeScript para type safety
- Tailwind CSS para estilos
- Google Gemini API para chatbot de IA
- Supabase para base de datos (likes, comentarios)
- React Server Components y Client Components

Estructura:
- app/: Páginas y API routes de Next.js
- components/: Componentes React organizados
- lib/: Utilidades (IA, Supabase, analytics)
- data/: Datos del portafolio en JSON
- types/: Definiciones TypeScript

Características:
1. Chatbot de IA que responde sobre el portafolio
2. Sistema de likes persistente
3. Gamificación con logros
4. Analytics y tracking

¿Puedes revisar el proyecto y ayudarme a mejorarlo?
```

---

## 🔧 PROMPTS DE CONFIGURACIÓN

### 2. Verificar y Corregir Configuración

```
Revisa todos los archivos de configuración del proyecto:
1. package.json - Verifica dependencias
2. tsconfig.json - Verifica configuración TypeScript
3. next.config.js - Verifica configuración Next.js
4. tailwind.config.ts - Verifica estilos
5. postcss.config.js - Verifica PostCSS

Si encuentras problemas, corrígelos automáticamente.
```

### 3. Instalar Dependencias

```
Instala todas las dependencias del proyecto ejecutando npm install.
Si hay errores, analízalos y sugiere soluciones.
Verifica que todas las dependencias estén correctamente instaladas.
```

### 4. Configurar Variables de Entorno

```
Necesito configurar las variables de entorno. 
Ayúdame a:
1. Crear .env.local basado en .env.local.example
2. Explicar cómo obtener GEMINI_API_KEY de Google
3. Explicar cómo configurar Supabase
4. Verificar que los nombres de variables sean correctos
```

---

## 🚀 PROMPTS DE DESARROLLO

### 5. Ejecutar y Verificar

```
Ejecuta el proyecto en modo desarrollo con npm run dev.
Verifica que no haya errores de compilación.
Si hay errores, analízalos y sugiere correcciones.
```

### 6. Mejorar el Chatbot

```
Mejora el componente ChatBot (components/ai/ChatBot.tsx):
1. Añade sugerencias de preguntas frecuentes
2. Mejora el manejo de errores
3. Añade más contexto sobre proyectos en las respuestas
4. Mejora la UI con mejores animaciones
5. Añade historial persistente en localStorage
```

### 7. Optimizar Performance

```
Analiza el proyecto y optimiza el rendimiento:
1. Implementa code splitting donde sea necesario
2. Añade lazy loading a componentes pesados
3. Optimiza imágenes con next/image
4. Implementa memoización donde sea útil
5. Reduce el bundle size
6. Añade loading states apropiados
```

### 8. Añadir Sistema de Comentarios

```
Crea un sistema completo de comentarios:
1. Componente Comments.tsx en components/social/
2. API route en app/api/comments/route.ts
3. Funciones en lib/supabase.ts para manejar comentarios
4. UI moderna con avatares y timestamps
5. Validación y sanitización de comentarios
6. Sistema de respuestas anidadas
```

### 9. Mejorar Gamificación

```
Expande el sistema de gamificación:
1. Añade más logros (10+ logros diferentes)
2. Crea un componente de perfil de visitante
3. Añade sistema de puntos acumulativos
4. Crea un leaderboard (opcional)
5. Añade badges visuales
6. Implementa notificaciones más elegantes
```

### 10. Añadir Dashboard de Analytics

```
Crea un dashboard de analytics visual:
1. Componente Dashboard.tsx
2. Gráficos con Chart.js o Recharts
3. Métricas: visitas, likes, comentarios, tiempo en página
4. Filtros por fecha
5. Exportación de datos
6. Visualización de tendencias
```

---

## 🎨 PROMPTS DE DISEÑO

### 11. Mejorar UI/UX

```
Mejora el diseño y UX del portafolio:
1. Añade animaciones más suaves con Framer Motion
2. Mejora la paleta de colores
3. Añade modo oscuro/claro con toggle
4. Mejora la responsividad en móviles
5. Añade micro-interacciones
6. Mejora la tipografía y espaciado
```

### 12. Añadir Efectos Visuales

```
Añade efectos visuales avanzados:
1. Partículas animadas en el fondo
2. Efectos de glassmorphism
3. Gradientes animados
4. Efectos parallax sutiles
5. Transiciones de página suaves
6. Efectos hover más sofisticados
```

---

## 🔍 PROMPTS DE ANÁLISIS

### 13. Analizar Código

```
Analiza el código del proyecto y sugiere mejoras:
1. Identifica código duplicado
2. Sugiere refactorizaciones
3. Identifica posibles bugs
4. Sugiere mejores prácticas
5. Optimiza la estructura de componentes
6. Mejora la organización del código
```

### 14. Revisar Seguridad

```
Revisa la seguridad del proyecto:
1. Verifica validación de inputs
2. Revisa protección CSRF
3. Verifica sanitización de datos
4. Revisa configuración de CORS
5. Verifica manejo de errores
6. Sugiere mejoras de seguridad
```

---

## 📱 PROMPTS DE FUNCIONALIDADES

### 15. Añadir PWA

```
Convierte el portafolio en una PWA:
1. Crea manifest.json
2. Implementa service worker
3. Añade iconos en múltiples tamaños
4. Configura caché offline
5. Añade splash screen
6. Habilita instalación como app
```

### 16. Integrar GitHub API

```
Integra la GitHub API para mostrar:
1. Estadísticas de repositorios (stars, forks)
2. Gráfico de contribuciones
3. Lenguajes más usados
4. Actividad reciente
5. Proyectos destacados automáticamente
6. Actualización automática de proyectos
```

### 17. Añadir Multilenguaje

```
Implementa sistema multilenguaje (i18n):
1. Configura next-intl o similar
2. Añade traducciones ES/EN
3. Selector de idioma en header
4. URLs localizadas (/es/, /en/)
5. Persistencia de preferencia
6. Meta tags por idioma
```

---

## 🧪 PROMPTS DE TESTING

### 18. Añadir Tests

```
Añade tests completos al proyecto:
1. Configura Jest y React Testing Library
2. Tests unitarios para componentes principales
3. Tests de integración para API routes
4. Tests E2E con Playwright
5. Tests de accesibilidad
6. Coverage mínimo del 80%
```

---

## 🚀 PROMPTS DE DEPLOYMENT

### 19. Preparar para Producción

```
Prepara el proyecto para producción:
1. Optimiza imágenes y assets
2. Configura variables de entorno de producción
3. Añade error boundaries
4. Configura logging
5. Optimiza SEO
6. Configura analytics de producción
7. Crea script de build optimizado
```

### 20. Configurar CI/CD

```
Configura CI/CD con GitHub Actions:
1. Tests automáticos en cada push
2. Build automático
3. Deploy automático a Vercel
4. Lighthouse CI para performance
5. Notificaciones de deploy
6. Rollback automático si falla
```

---

## 💡 CÓMO USAR ESTOS PROMPTS

1. **Copia el prompt** que necesites
2. **Pégalo en el chat del agente** de Antigravity
3. **Revisa las sugerencias** del agente
4. **Aplica los cambios** que te parezcan útiles
5. **Itera** si necesitas ajustes

---

## 🎯 PROMPTS PERSONALIZADOS

Si necesitas algo específico, usa este formato:

```
[Describe lo que quieres hacer]

Contexto:
- [Información relevante sobre el proyecto]
- [Restricciones o requisitos]

El agente debería:
1. [Acción 1]
2. [Acción 2]
3. [Acción 3]

Sigue los patrones ya establecidos en el proyecto.
```

---

## ✅ Tips para Mejores Resultados

1. **Sé específico:** Menciona archivos y componentes exactos
2. **Proporciona contexto:** Explica qué quieres lograr y por qué
3. **Itera:** Si el resultado no es perfecto, refina el prompt
4. **Revisa el código:** Siempre revisa lo que el agente genera
5. **Aprende:** Usa las explicaciones del agente para mejorar

---

**¡Usa estos prompts para desarrollar tu portafolio revolucionario con Antigravity!** 🚀

