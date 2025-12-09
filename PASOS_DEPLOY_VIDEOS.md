# 🚀 Pasos para Deploy con Videos

## ❌ Problema Actual

Vercel tiene un límite de **100 MB por archivo**. Tus videos son:

- `erp-demo.mp4`: ~172 MB ❌
- `vilok-demo.mp4`: ~358 MB ❌  
- `TasaDiv...`: ~68 MB ✅ (este sí pasa)

## ✅ Solución: Deploy en 2 Pasos

### **PASO 1: Deploy del Portafolio (SIN videos)**

Los videos están excluidos del deploy automáticamente gracias a `.vercelignore`.

```powershell
vercel --prod
```

Esto debería funcionar ahora sin problemas ✅

---

### **PASO 2: Subir Videos por Separado (Vercel Blob Storage)**

Una vez que el portafolio esté desplegado, sube los videos:

#### 2.1 Obtén un Token de Vercel

1. Ve a: <https://vercel.com/dashboard>
2. Click en tu **perfil** (arriba derecha)
3. Ve a **"Settings"**
4. Ve a **"Tokens"** (en el menú lateral)
5. Click en **"Create Token"**
6. **Nombre**: `blob-videos`
7. **Scope**: Selecciona tu proyecto `mi-portafolio`
8. Click **"Create"**
9. **¡IMPORTANTE!** Copia el token (solo se muestra una vez)

#### 2.2 Sube los Videos

Ejecuta este comando (reemplaza `TU_TOKEN` con el token que copiaste):

```powershell
$env:VERCEL_BLOB_TOKEN="TU_TOKEN_AQUI"
node scripts/upload-videos-simple.js
```

El script:

- ✅ Subirá los 3 videos automáticamente
- ✅ Te dará las URLs públicas de cada video
- ✅ Te dirá qué archivos actualizar

#### 2.3 Actualiza las URLs en el Código

Después de obtener las URLs, actualiza estos archivos:

**1. `components/portfolio/Projects.tsx`** (líneas 54-85 aproximadamente)

Cambia:

```tsx
src="/videos/erp-demo.mp4"
```

Por:

```tsx
src="https://[URL_DE_BLOB_STORAGE]/erp-demo.mp4"
```

**2. `app/projects/[id]/page.tsx`** (busca las referencias a `/videos/`)

Haz el mismo cambio para todas las rutas de video.

#### 2.4 Hacer Commit y Push

```powershell
git add .
git commit -m "Update: Usar URLs de Vercel Blob Storage para videos"
git push origin main
```

Vercel hará redeploy automáticamente con las nuevas URLs ✅

---

## 🎯 Resumen Rápido

```powershell
# 1. Deploy sin videos (debería funcionar ahora)
vercel --prod

# 2. Subir videos (después del deploy)
$env:VERCEL_BLOB_TOKEN="tu_token"
node scripts/upload-videos-simple.js

# 3. Actualizar código con las URLs generadas
# 4. Commit y push
git add .
git commit -m "Update video URLs"
git push
```

---

## ⚠️ Si Algo Falla

- **Error al subir videos**: Verifica que el token sea correcto y tenga permisos
- **Videos no se muestran**: Verifica que las URLs en el código sean correctas
- **Deploy falla**: Asegúrate de que `.vercelignore` existe y contiene `public/videos/`

---

¿Necesitas ayuda con algún paso? Avísame y te guío.
