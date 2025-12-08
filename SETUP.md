# 🚀 Guía de Configuración del Portafolio

## Paso 1: Configurar Variables de Entorno

### 1.1 Copiar archivo de ejemplo
```bash
cp .env.example .env.local
```

### 1.2 Configurar Supabase (Para Comentarios)

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

-- Índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_interactions_project ON interactions(project_id);
CREATE INDEX IF NOT EXISTS idx_interactions_visitor ON interactions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_achievements_visitor ON achievements(visitor_id);

-- Habilitar RLS (Row Level Security) - Opcional pero recomendado
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (permite lectura/escritura pública)
CREATE POLICY "Allow public read" ON interactions FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON interactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Allow public insert achievements" ON achievements FOR INSERT WITH CHECK (true);
```

### 1.5 Verificar configuración

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Visita `http://localhost:3000` y verifica:
- ✅ Los comentarios funcionan en los proyectos
- ✅ Los logros se desbloquean al interactuar
- ✅ El portafolio se muestra correctamente

## Solución de Problemas

### Error: "Supabase connection failed"
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` están correctos
- Verifica que las tablas están creadas en Supabase
- Revisa la consola del navegador para más detalles

## Próximos Pasos

Una vez configurado, puedes:
1. ✅ Agregar más proyectos al portafolio
2. ✅ Personalizar el contenido y diseño
3. ✅ Agregar experiencia laboral y educación







