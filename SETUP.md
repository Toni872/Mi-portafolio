# 🚀 Guía de Configuración del Portafolio

## Paso 1: Configurar Variables de Entorno

### 1.1 Copiar archivo de ejemplo
```bash
cp .env.example .env.local
```

### 1.2 Configurar Google Gemini API (Para Chatbot IA)

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API key
4. Copia la API key y pégala en `.env.local`:
   ```
   GEMINI_API_KEY=tu_api_key_aqui
   ```

### 1.3 Configurar Supabase (Para Likes, Comentarios y Analytics)

#### Opción A: Crear proyecto nuevo en Supabase

1. Ve a [Supabase](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a Settings > API
4. Copia la URL y la anon key:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### Opción B: Usar Supabase local (Docker)

```bash
# Si tienes Docker instalado
docker run -d \
  --name supabase \
  -p 54321:54321 \
  -e POSTGRES_PASSWORD=postgres \
  supabase/postgres
```

### 1.4 Configurar Base de Datos en Supabase

Ejecuta este SQL en el SQL Editor de Supabase:

```sql
-- Tabla de interacciones (likes, comentarios, views)
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  project_id TEXT,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'comment', 'view')),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de logros desbloqueados
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(visitor_id, achievement_id)
);

-- Tabla de analytics (opcional)
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT,
  event_type TEXT NOT NULL,
  event_data JSONB,
  page_path TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_interactions_project ON interactions(project_id);
CREATE INDEX IF NOT EXISTS idx_interactions_visitor ON interactions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_achievements_visitor ON achievements(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);

-- Habilitar RLS (Row Level Security) - Opcional pero recomendado
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (permite lectura/escritura pública)
CREATE POLICY "Allow public read" ON interactions FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON interactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Allow public insert achievements" ON achievements FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert analytics" ON analytics FOR INSERT WITH CHECK (true);
```

### 1.5 Verificar configuración

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Visita `http://localhost:3000` y verifica:
- ✅ El chatbot aparece en la esquina inferior derecha
- ✅ Los likes funcionan en los proyectos
- ✅ Los logros se desbloquean al interactuar

## Solución de Problemas

### Error: "GEMINI_API_KEY no configurada"
- Verifica que el archivo `.env.local` existe
- Verifica que la variable `GEMINI_API_KEY` tiene un valor válido
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "Supabase connection failed"
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` están correctos
- Verifica que las tablas están creadas en Supabase
- Revisa la consola del navegador para más detalles

### El chatbot no responde
- Verifica que `GEMINI_API_KEY` es válida
- Revisa la consola del servidor para errores
- Verifica que tienes créditos en Google AI Studio

## Próximos Pasos

Una vez configurado, puedes:
1. ✅ Agregar más proyectos al portafolio
2. ✅ Personalizar el chatbot con más contexto
3. ✅ Configurar analytics avanzados
4. ✅ Integrar con el sistema de agentes autónomos

