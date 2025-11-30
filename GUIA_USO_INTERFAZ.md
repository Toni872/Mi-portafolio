# 🎯 Guía de Uso del Portafolio - Interfaz Completa

## 🌐 Acceso al Portafolio

**URL Principal**: `http://localhost:3002`

> **Nota**: El puerto 3000 está ocupado por el Dashboard de Agentes Autónomos. El portafolio corre en el puerto 3002.

## 📍 Navegación Principal

### **Header (Barra Superior)**

- **Logo "TL"**: Haz clic para volver al inicio
- **Menú de navegación**:
  - Home → Sección principal
  - About → Sobre ti
  - Skills → Tecnologías
  - Projects → Proyectos destacados
  - Contact → Información de contacto
- **Toggle de tema** (🌙/☀️): Cambia entre modo oscuro y claro

---

## 🏠 Sección Principal (Hero)

**Qué hacer aquí:**

- Lee tu presentación personal
- Observa tu título profesional
- Navega hacia abajo para explorar más

---

## 👤 Sección About

**Qué hacer aquí:**

- Revisa tu información personal
- Verifica que la descripción sea correcta
- Personaliza el contenido si es necesario

---

## 🛠️ Sección TechStack (Tecnologías)

**Qué hacer aquí:**

- Revisa las tecnologías mostradas
- Verifica que los iconos se vean correctamente
- Asegúrate de que todas tus tecnologías principales estén incluidas

---

## 💼 Sección Projects (Proyectos)

### **Proyecto Destacado (Primero)**

- **Imagen grande**: Muestra el proyecto principal
- **Botón "Live app"**: Enlace a la demo en vivo
- **Botón "Learn more"**: Enlace al código en GitHub
- **Botón de Like (❤️)**: Da like al proyecto
- **Botón "Ver comentarios"**: Expande/contrae comentarios

### **Otros Proyectos**

- **Cards más pequeñas**: Cada proyecto tiene su propia tarjeta
- **Like button**: Da like a cada proyecto individualmente
- **Ver comentarios**: Abre la sección de comentarios

### **Sistema de Comentarios**

1. Haz clic en "Ver comentarios" en cualquier proyecto
2. Escribe tu comentario (máximo 500 caracteres)
3. Haz clic en el botón de enviar (📤)
4. Tu comentario aparecerá inmediatamente
5. Puedes ver comentarios de otros visitantes

---

## 🤖 Sección: Sistema de Agentes Autónomos

**Qué ver aquí:**

- **Estadísticas del Pool**:
  - Total de agentes activos
  - Agentes disponibles (idle)
  - Agentes trabajando (working)
  - Total de tareas completadas

- **Lista de Agentes**:
  - **General Agent**: Agente de propósito general
  - **Coder Agent**: Especializado en código
  - **Researcher Agent**: Especializado en investigación
  - **Visual Agent**: Especializado en verificación visual

**Estado de cada agente:**

- 🟢 **Idle**: Disponible para trabajar
- 🔵 **Working**: Procesando una tarea
- 🔴 **Error**: Ha ocurrido un error
- ⚪ **Offline**: No disponible

**Nota**: Esta sección requiere que el backend de agentes esté corriendo en `http://localhost:3001`

---

## 📊 Sección: Analytics Dashboard

**Qué ver aquí:**

- **Tarjetas de estadísticas**:
  - 👁️ Total de Visitas
  - ❤️ Total de Likes
  - 💬 Total de Comentarios
  - 👥 Visitantes Únicos

- **Filtros de tiempo**:
  - **7 días**: Última semana
  - **30 días**: Último mes
  - **Todo**: Todas las estadísticas

- **Estadísticas por Proyecto**:
  - Lista de proyectos con sus métricas
  - Barras visuales de comparación
  - Vistas, likes y comentarios por proyecto

**Nota**: Requiere que Supabase esté configurado para mostrar datos reales

---

## 💬 Chatbot de IA (Esquina Inferior Derecha)

### **Cómo usar el Chatbot:**

1. **Abrir el chat**:
   - Haz clic en el botón flotante con el icono de bot (🤖)
   - Aparecerá una ventana de chat

2. **Hacer preguntas**:
   - Escribe tu pregunta en el campo de texto
   - Ejemplos de preguntas:
     - "¿Qué proyectos has desarrollado?"
     - "¿Qué tecnologías conoces?"
     - "Cuéntame sobre tu experiencia con React"
     - "¿Cómo puedo contactarte?"
     - "¿Qué es VilokProject?"

3. **Enviar mensaje**:
   - Haz clic en el botón de enviar (📤) o presiona Enter
   - El bot responderá con información sobre tu portafolio

4. **Cerrar el chat**:
   - Haz clic en la X en la esquina superior derecha
   - O haz clic fuera del chat

**Nota**: Requiere `GEMINI_API_KEY` configurada en `.env.local` para funcionar

---

## 🏆 Sistema de Logros (Gamificación)

### **Logros Disponibles:**

1. **🌟 Primera Visita**
   - Se desbloquea automáticamente al visitar el portafolio

2. **🔍 Explorador**
   - Desbloquéalo viendo todos los proyectos
   - Navega por cada proyecto y haz scroll hasta el final

3. **❤️ Fan**
   - Desbloquéalo dando tu primer like
   - Haz clic en el botón de like de cualquier proyecto

4. **💬 Curioso**
   - Desbloquéalo haciendo una pregunta al chatbot
   - Abre el chat y envía cualquier mensaje

### **Cómo ver tus logros:**

- Los logros aparecen como notificaciones cuando los desbloqueas
- Se guardan en localStorage de tu navegador
- Cada visitante tiene su propio progreso

---

## 📧 Sección Contact

**Qué hacer aquí:**

- Verifica que tu email sea correcto
- Verifica los enlaces de GitHub y LinkedIn
- Los visitantes pueden hacer clic para contactarte

---

## 🎨 Funcionalidades Adicionales

### **Modo Oscuro/Claro**

- Haz clic en el icono 🌙/☀️ en el header
- El tema se guarda automáticamente
- Se aplica a toda la interfaz

### **Navegación Suave**

- Los enlaces del menú hacen scroll suave
- El header se vuelve translúcido al hacer scroll
- La sección activa se resalta automáticamente

### **Responsive Design**

- Funciona en móviles, tablets y desktop
- El menú se convierte en hamburguesa en móviles
- Todos los componentes se adaptan al tamaño de pantalla

---

## ✅ Checklist de Pruebas

### **Para probar todas las funcionalidades:**

- [ ] **Navegación**: Haz clic en cada sección del menú
- [ ] **Proyectos**:
  - [ ] Da like a varios proyectos
  - [ ] Abre los comentarios de un proyecto
  - [ ] Escribe un comentario de prueba
  - [ ] Haz clic en los enlaces "Live app" y "Code"
- [ ] **Chatbot**:
  - [ ] Abre el chat
  - [ ] Haz una pregunta sobre tus proyectos
  - [ ] Prueba varias preguntas diferentes
- [ ] **Logros**:
  - [ ] Visita todos los proyectos (desbloquea Explorador)
  - [ ] Da un like (desbloquea Fan)
  - [ ] Usa el chatbot (desbloquea Curioso)
- [ ] **Tema**:
  - [ ] Cambia entre modo oscuro y claro
  - [ ] Recarga la página y verifica que se mantiene
- [ ] **Agentes**:
  - [ ] Verifica que se muestren los 4 agentes
  - [ ] Observa las estadísticas del pool
- [ ] **Analytics**:
  - [ ] Cambia entre los filtros de tiempo
  - [ ] Observa las estadísticas por proyecto

---

## 🔧 Configuración Necesaria

### **Para que TODO funcione completamente:**

1. **Variables de Entorno** (`.env.local`):

   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
   ```

2. **Supabase**:
   - Crea las tablas según `SETUP.md`
   - Ejecuta el SQL proporcionado

3. **Backend de Agentes** (Opcional):
   - Inicia el servidor en `http://localhost:3001`
   - Para ver los agentes funcionando

---

## 🎯 Próximos Pasos Recomendados

1. **Personalizar Contenido**:
   - Edita `data/portfolio.json` con tu información real
   - Agrega más proyectos si tienes
   - Actualiza las tecnologías

2. **Configurar APIs**:
   - Obtén tu API key de Gemini
   - Configura Supabase
   - Prueba todas las funcionalidades

3. **Mejorar Visualmente**:
   - Agrega imágenes reales de tus proyectos
   - Personaliza los colores si lo deseas
   - Crea los iconos PWA

4. **Deploy**:
   - Despliega en Vercel/Netlify
   - Configura las variables de entorno en producción
   - Comparte tu portafolio

---

## 💡 Tips de Uso

- **Para visitantes**: Explora todos los proyectos, da likes, comenta y usa el chatbot
- **Para ti**: Usa el dashboard de analytics para ver quién visita tu portafolio
- **Para desarrollo**: Revisa la consola del navegador para ver logs y errores
- **Para móvil**: Prueba en diferentes dispositivos para verificar el responsive

---

## 🆘 Solución de Problemas

### **El chatbot no responde**

- Verifica que `GEMINI_API_KEY` esté configurada
- Revisa la consola del navegador para errores

### **Los likes no se guardan**

- Verifica que Supabase esté configurado
- Revisa que las tablas estén creadas

### **Los agentes no aparecen**

- Verifica que el backend esté corriendo en puerto 3001
- Revisa la consola para errores de conexión

### **El modo oscuro no funciona**

- Limpia el localStorage del navegador
- Recarga la página

---

¡Disfruta explorando tu portafolio revolucionario! 🚀
