# 🎥 Guía Completa: Subir Videos a Cloudinary

## 📋 Paso 1: Crear Cuenta en Cloudinary

1. Ve a: **https://cloudinary.com/users/register/free**
2. Completa el formulario (email, contraseña, nombre)
3. Confirma tu email
4. ¡Listo! Tienes 25GB gratis

---

## 🔑 Paso 2: Obtener Credenciales

1. **Inicia sesión** en Cloudinary: https://cloudinary.com/console
2. En el **Dashboard**, verás un panel con tus credenciales:
   - **Cloud name** (ejemplo: `dabc123`)
   - **API Key** (ejemplo: `123456789012345`)
   - **API Secret** (ejemplo: `abcdefghijklmnopqrstuvwxyz123456`)
3. **Copia las 3 credenciales** (las necesitarás en el siguiente paso)

> 💡 **Tip**: Si no ves las credenciales, ve a: **Settings** → **API Keys**

---

## 🚀 Paso 3: Subir los Videos

Abre PowerShell en la carpeta del proyecto y ejecuta (reemplaza con tus credenciales):

```powershell
# Configurar variables de entorno
$env:CLOUDINARY_CLOUD_NAME="tu_cloud_name_aqui"
$env:CLOUDINARY_API_KEY="tu_api_key_aqui"
$env:CLOUDINARY_API_SECRET="tu_api_secret_aqui"

# Ejecutar script
node scripts/upload-videos-cloudinary.js
```

**Ejemplo real:**
```powershell
$env:CLOUDINARY_CLOUD_NAME="dabc123"
$env:CLOUDINARY_API_KEY="123456789012345"
$env:CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz123456"
node scripts/upload-videos-cloudinary.js
```

El script:
- ✅ Subirá los 3 videos automáticamente
- ✅ Te mostrará las URLs generadas
- ⏱️ Puede tardar varios minutos (los videos son grandes)

---

## 📝 Paso 4: Actualizar el Código

Una vez que tengas las URLs, **avísame** y actualizaré automáticamente:
- `components/portfolio/Projects.tsx`
- `app/projects/[id]/page.tsx`

O si prefieres hacerlo manualmente, busca y reemplaza:
- `/videos/erp-demo.mp4` → URL de Cloudinary para ERP
- `/videos/vilok-demo.mp4` → URL de Cloudinary para Vilok
- `/videos/TasaDiv...` → URL de Cloudinary para TasaDiv

---

## ✅ Paso 5: Commit y Deploy

```powershell
git add .
git commit -m "Update: Usar Cloudinary para videos de proyectos"
git push origin main
```

Vercel hará redeploy automáticamente ✅

---

## 🆘 Si Algo Falla

- **Error de autenticación**: Verifica que copiaste bien las 3 credenciales
- **Error de tamaño**: Los videos son grandes, espera a que termine (puede tardar 5-10 minutos)
- **Videos no se muestran**: Verifica que las URLs en el código sean correctas

---

¿Listo para empezar? Ejecuta el Paso 3 y avísame cuando tengas las URLs 🚀


