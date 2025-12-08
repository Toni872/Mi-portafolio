# 🎬 Guía para Subir Videos de Proyectos

## 📋 Estado Actual

Los videos de los proyectos están excluidos del repositorio de GitHub porque exceden el límite de tamaño (100MB). Las **miniaturas/imágenes** de los proyectos sí están incluidas y se muestran correctamente.

## ✅ Lo que ya funciona

- ✅ Las miniaturas de todos los proyectos se muestran correctamente
- ✅ Las imágenes están en `/public/projects/`:
  - `erp-dashboard.png` ✅
  - `vilok-marketplace.png` ✅
  - `tasadiv-cover.png` ✅ (placeholder creado)

## 🎥 Videos que necesitan ser subidos

1. **ERP Demo**: `/videos/erp-demo.mp4` (171.98 MB)
2. **Vilok Demo**: `/videos/vilok-demo.mp4` (357.51 MB)
3. **TasaDiv Demo**: `/videos/TasaDiv - Tasas de Cambio para Latinoamérica - Google Chrome 2025-11-11 17-23-33.mp4` (67.50 MB)

## 🚀 Opciones para Subir Videos

### Opción 1: Subir directamente a Vercel (Recomendado para empezar)

Los videos se pueden subir directamente cuando haces deploy en Vercel:

1. **Mantén los videos localmente** en `public/videos/`
2. **Haz deploy en Vercel** - los videos se subirán automáticamente
3. ⚠️ **Limitación**: Vercel tiene un límite de 4.5MB para archivos estáticos en el plan Hobby (gratis). Para archivos más grandes necesitarás:
   - Usar Vercel Blob Storage
   - O usar una de las otras opciones

### Opción 2: Vercel Blob Storage (Recomendado para producción)

1. **Instala Vercel Blob**:

   ```bash
   npm install @vercel/blob
   ```

2. **Sube los videos** usando la API de Vercel Blob:

   ```javascript
   // scripts/upload-videos.js
   const { put } = require('@vercel/blob');
   
   // Subir cada video
   const blob = await put('erp-demo.mp4', file, {
     access: 'public',
   });
   ```

3. **Actualiza las rutas** en el código para usar las URLs de Blob

### Opción 3: Cloudinary (Alternativa popular)

1. **Crea una cuenta** en [cloudinary.com](https://cloudinary.com)
2. **Sube los videos** a Cloudinary
3. **Actualiza las rutas** en:
   - `components/portfolio/Projects.tsx`
   - `app/projects/[id]/page.tsx`

   Cambia:

   ```tsx
   src="/videos/erp-demo.mp4"
   ```

   Por:

   ```tsx
   src="https://res.cloudinary.com/tu-cuenta/video/upload/v1234567890/erp-demo.mp4"
   ```

### Opción 4: AWS S3 + CloudFront

1. **Crea un bucket S3** en AWS
2. **Sube los videos** al bucket
3. **Configura CloudFront** para distribución
4. **Actualiza las rutas** a las URLs de CloudFront

### Opción 5: YouTube (Embeds)

Si prefieres usar YouTube:

1. **Sube los videos a YouTube** (como no listados o privados)
2. **Usa embeds** en lugar de elementos `<video>`
3. **Actualiza los componentes** para usar iframes de YouTube

## 📝 Pasos Inmediatos (Sin Videos)

**El portafolio funciona perfectamente sin videos**. Actualmente:

- ✅ Las miniaturas se muestran correctamente
- ✅ Los proyectos son completamente funcionales
- ✅ Los usuarios pueden ver toda la información

Los videos solo se muestran en la **página de detalle** de cada proyecto cuando están disponibles.

## 🔧 Código Actual

El código está preparado para:

1. **Mostrar siempre las imágenes** como miniaturas
2. **Intentar cargar videos** solo en la página de detalle
3. **Manejar errores gracefully** si los videos no están disponibles
4. **Mostrar icono de play** en hover para indicar que hay video disponible

## ⚡ Quick Fix para Testing Local

Si quieres probar los videos localmente:

1. Los videos ya están en `public/videos/` localmente
2. Ejecuta `npm run dev`
3. Los videos funcionarán en localhost
4. Para producción, sigue una de las opciones arriba

## 📌 Recomendación

Para empezar rápido:

1. **Deploy sin videos** (ya está hecho) - funciona perfectamente
2. **Más tarde**, sube los videos usando **Vercel Blob Storage** o **Cloudinary**
3. **Actualiza las rutas** cuando tengas las URLs de los videos

---

¿Necesitas ayuda con alguna de estas opciones? Puedo ayudarte a implementar cualquiera de ellas.
