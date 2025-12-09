# 🎥 Solución para Videos - 3 Opciones

El token de Vercel que proporcionaste no tiene permisos para Blob Storage. Aquí tienes **3 alternativas**:

---

## ✅ OPCIÓN 1: Cloudinary (RECOMENDADO - GRATIS)

**Ventajas:**
- ✅ 25GB gratis
- ✅ CDN global (videos cargan rápido)
- ✅ Optimización automática
- ✅ Fácil de usar

**Pasos:**

1. **Crea cuenta gratis**: https://cloudinary.com/users/register/free

2. **Obtén tus credenciales**:
   - Ve a Dashboard → Settings → API Keys
   - Copia: **Cloud name**, **API Key**, **API Secret**

3. **Sube los videos**:
   ```powershell
   $env:CLOUDINARY_CLOUD_NAME="tu_cloud_name"
   $env:CLOUDINARY_API_KEY="tu_api_key"
   $env:CLOUDINARY_API_SECRET="tu_api_secret"
   node scripts/upload-videos-cloudinary.js
   ```

4. **Actualiza el código** con las URLs generadas

---

## ✅ OPCIÓN 2: YouTube (GRATIS - Sin límites)

**Ventajas:**
- ✅ Ilimitado y gratis
- ✅ CDN de Google
- ✅ Ya tienes cuenta probablemente

**Pasos:**

1. **Sube los videos a YouTube** como "No listado" (privados pero con link)

2. **Obtén el ID del video** de la URL:
   - Ejemplo: `https://youtube.com/watch?v=ABC123` → ID: `ABC123`

3. **Usa el embed de YouTube** en el código:
   ```tsx
   <iframe 
     src={`https://www.youtube.com/embed/${videoId}`}
     frameBorder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowFullScreen
   />
   ```

---

## ✅ OPCIÓN 3: Deploy Manual con Vercel CLI (SIN videos grandes)

**Si solo quieres que funcione el portafolio SIN videos por ahora:**

1. **Haz deploy** (los videos están excluidos):
   ```powershell
   vercel --prod
   ```

2. **Los videos no aparecerán**, pero el portafolio funcionará

3. **Más tarde** puedes subir los videos usando Opción 1 o 2

---

## 🎯 Mi Recomendación

**Usa Cloudinary (Opción 1)** porque:
- Es gratis y fácil
- Los videos cargan rápido
- No necesitas cambiar mucho código
- Es profesional

¿Quieres que te guíe con alguna de estas opciones?

