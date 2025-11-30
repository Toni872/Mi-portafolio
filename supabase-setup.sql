-- Tabla para almacenar interacciones (likes, comentarios, vistas)
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  project_id TEXT,
  interaction_type TEXT CHECK (interaction_type IN ('like', 'comment', 'view')),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_interactions_visitor ON interactions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_interactions_project ON interactions(project_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON interactions(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer
CREATE POLICY "Anyone can read interactions"
  ON interactions
  FOR SELECT
  TO public
  USING (true);

-- Política: Todos pueden insertar (para likes anónimos)
CREATE POLICY "Anyone can insert interactions"
  ON interactions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Política: Solo el creador puede actualizar (basado en visitor_id)
CREATE POLICY "Users can update their own interactions"
  ON interactions
  FOR UPDATE
  TO public
  USING (visitor_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Política: Solo el creador puede eliminar
CREATE POLICY "Users can delete their own interactions"
  ON interactions
  FOR DELETE
  TO public
  USING (visitor_id = current_setting('request.jwt.claims', true)::json->>'sub');
