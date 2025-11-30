# 🚀 Guía de Instalación - Portafolio Revolucionario

## Paso 1: Instalar Dependencias

```bash
cd portafolio-revolucionario
npm install
```

## Paso 2: Configurar Variables de Entorno

### Opción A: Con Gemini API (Recomendado para Chatbot)

1. Obtén tu API key de [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea el archivo `.env.local`:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

### Opción B: Con Supabase (Para funcionalidades sociales completas)

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a Settings > API
3. Copia la URL y Anon Key
4. Añade a `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Configuración Completa (Recomendada)

```env
# Google Gemini API (para chatbot)
GEMINI_API_KEY=tu_gemini_api_key

# Supabase (para likes y comentarios)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=tu_google_analytics_id
```

## Paso 3: Configurar Supabase (Opcional pero Recomendado)

Si quieres usar likes y comentarios:

1. Ve a tu proyecto en Supabase
2. Abre el SQL Editor
3. Ejecuta este script:

```sql
-- Tabla de interacciones
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  project_id TEXT,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'comment', 'view')),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_interactions_project ON interactions(project_id);
CREATE INDEX IF NOT EXISTS idx_interactions_visitor ON interactions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON interactions(created_at DESC);
```

## Paso 4: Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ✅ Verificación

### Chatbot de IA
- Haz clic en el botón flotante del chatbot (esquina inferior derecha)
- Haz una pregunta como "¿Qué proyectos tienes?"
- Deberías recibir una respuesta de la IA

### Sistema de Likes
- Ve a la sección de Proyectos
- Haz clic en el botón de like (corazón)
- El contador debería aumentar

### Gamificación
- Realiza acciones (visitar, dar like, usar el chat)
- Deberías ver notificaciones de logros desbloqueados

## 🐛 Solución de Problemas

### Error: "GEMINI_API_KEY is not defined"
- Asegúrate de tener el archivo `.env.local` con la variable
- Reinicia el servidor de desarrollo

### Error: "Supabase connection failed"
- Verifica que las variables de entorno de Supabase estén correctas
- Asegúrate de que la tabla `interactions` esté creada

### El chatbot no responde
- Verifica que GEMINI_API_KEY esté configurada
- Revisa la consola del navegador para errores
- Verifica que tengas créditos en Google AI Studio

### Los likes no se guardan
- Verifica la configuración de Supabase
- Asegúrate de que la tabla `interactions` exista
- Revisa los permisos RLS en Supabase

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🎯 Próximos Pasos

1. Personaliza el contenido en `data/portfolio.json`
2. Añade tus propias imágenes en `public/`
3. Configura tu dominio personalizado
4. Despliega en Vercel

¡Listo para empezar! 🚀

