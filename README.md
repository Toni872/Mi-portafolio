# 🚀 Portafolio Personal de Antonio Lloret

Portafolio interactivo con IA integrada, funcionalidades sociales y gamificación.

## ✨ Características

- 🤖 **Chatbot de IA** - Asistente virtual que responde preguntas sobre el portafolio
- ❤️ **Sistema de Likes** - Los visitantes pueden dar like a proyectos
- 🏆 **Gamificación** - Sistema de logros y puntos
- 📊 **Analytics** - Tracking de interacciones y eventos
- 🎨 **Diseño Moderno** - UI/UX profesional con Tailwind CSS
- ⚡ **Performance** - Optimizado con Next.js 14

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
cd portafolio-revolucionario
npm install
```

### 2. Configurar Variables de Entorno

Copia `.env.local.example` a `.env.local` y configura:

```env
GEMINI_API_KEY=tu_api_key_de_gemini
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3002](http://localhost:3002)

> **Nota**: El puerto 3002 se usa para evitar conflicto con el Dashboard de Agentes (puerto 3000)

## 📦 Estructura del Proyecto

```
portafolio-revolucionario/
├── app/              # Next.js App Router
│   ├── api/         # API Routes
│   ├── layout.tsx   # Layout principal
│   └── page.tsx     # Página principal
├── components/      # Componentes React
│   ├── ai/         # Componentes de IA
│   ├── portfolio/  # Componentes del portafolio
│   ├── social/     # Funcionalidades sociales
│   └── ui/         # Componentes UI base
├── lib/            # Utilidades y configuraciones
├── types/          # TypeScript types
└── data/           # Datos del portafolio
```

## 🔧 Configuración de Supabase (Opcional)

Si quieres usar funcionalidades sociales completas:

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta este SQL en el SQL Editor:

```sql
-- Tabla de interacciones
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  project_id TEXT,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'comment', 'view')),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX idx_interactions_project ON interactions(project_id);
CREATE INDEX idx_interactions_visitor ON interactions(visitor_id);
CREATE INDEX idx_interactions_type ON interactions(interaction_type);
```

## 🎯 Funcionalidades Implementadas

### Chatbot de IA
- Integración con Google Gemini API
- Respuestas contextuales sobre el portafolio
- Interfaz de chat moderna y responsive

### Sistema de Likes
- Likes persistentes en Supabase
- Contador en tiempo real
- Prevención de likes duplicados

### Gamificación
- Sistema de logros desbloqueables
- Notificaciones de logros
- Tracking de acciones del usuario

### Analytics
- Tracking de eventos
- Page views
- Interacciones de usuario

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Otras Plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 Próximas Mejoras

- [ ] Sistema de comentarios completo
- [ ] Dashboard de analytics visual
- [ ] Más logros y desafíos
- [ ] Integración con GitHub API
- [ ] Modo oscuro/claro
- [ ] PWA support

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License

