# 🎬 Guía Rápida: Subir Videos

## ✅ Opción más simple: Deploy Manual con Vercel CLI

Si los videos están en `public/videos/` en tu máquina, puedes subirlos directamente con Vercel CLI:

### Pasos:

1. **Instala Vercel CLI** (si no lo tienes):
   ```bash
   npm i -g vercel
   ```

2. **Login en Vercel**:
   ```bash
   vercel login
   ```

3. **Desde la carpeta del proyecto, haz deploy**:
   ```bash
   cd portafolio-revolucionario
   vercel --prod
   ```

   ⚠️ **Importante**: Los videos en `public/videos/` se subirán automáticamente porque están en tu máquina local (aunque no estén en Git).

4. ✅ **Listo**: Los videos estarán disponibles en tu sitio de Vercel.

---

## 🚀 Opción 2: Vercel Blob Storage (Recomendado para archivos grandes)

Si el deploy manual no funciona o quieres una solución más robusta:

### Paso 1: Instalar dependencia
```bash
npm install @vercel/blob
```

### Paso 2: Obtener token de Vercel
1. Ve a https://vercel.com/dashboard
2. Click en tu perfil → **Settings**
3. Ve a **Tokens**
4. Click en **Create Token**
5. Nombre: `blob-upload`
6. Scope: Selecciona tu proyecto
7. Copia el token generado

### Paso 3: Ejecutar script de subida

**En PowerShell:**
```powershell
$env:BLOB_READ_WRITE_TOKEN="tu_token_aqui"
node scripts/upload-videos-vercel.js
```

**En CMD:**
```cmd
set BLOB_READ_WRITE_TOKEN=tu_token_aqui
node scripts/upload-videos-vercel.js
```

El script:
- ✅ Subirá los 3 videos automáticamente
- ✅ Te dará las URLs públicas
- ✅ Te dirá qué archivos actualizar

### Paso 4: Actualizar las URLs en el código

Después de obtener las URLs, actualiza:
- `components/portfolio/Projects.tsx`
- `app/projects/[id]/page.tsx`

Cambia las rutas de `/videos/...` por las URLs de Blob Storage.

---

## ⚡ Opción 3: Cloudinary (Alternativa gratuita)

Si prefieres usar Cloudinary (tiene plan gratuito generoso):

1. **Crea cuenta** en https://cloudinary.com
2. **Sube los videos** manualmente desde el dashboard
3. **Copia las URLs** generadas
4. **Actualiza el código** con esas URLs

---

## 📋 Estado Actual

- ✅ Las miniaturas funcionan perfectamente
- ✅ El portafolio está completamente funcional
- ⏳ Los videos solo se muestran si están disponibles

**Recomendación**: Empieza con la **Opción 1 (Deploy Manual)** - es la más rápida y simple.

---

¿Necesitas ayuda con alguna opción? Puedo guiarte paso a paso.




