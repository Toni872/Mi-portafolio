/**
 * Script ALTERNATIVO: Subir videos a Cloudinary (GRATIS)
 * 
 * Cloudinary ofrece 25GB de almacenamiento gratuito
 * 
 * PASOS:
 * 1. Crea cuenta gratis: https://cloudinary.com/users/register/free
 * 2. Ve a Dashboard -> Settings -> API Keys
 * 3. Copia: Cloud name, API Key, API Secret
 * 4. Ejecuta: node scripts/upload-videos-cloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configuración desde variables de entorno
// Opción 1: CLOUDINARY_URL (formato: cloudinary://api_key:api_secret@cloud_name)
// Opción 2: Variables individuales
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (CLOUDINARY_URL) {
  // Usar CLOUDINARY_URL si está disponible
  cloudinary.config({
    cloudinary_url: CLOUDINARY_URL
  });
  console.log('✅ Configurado usando CLOUDINARY_URL\n');
} else if (CLOUD_NAME && API_KEY && API_SECRET) {
  // Usar variables individuales
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
  console.log('✅ Configurado usando variables individuales\n');
} else {
  console.error('\n❌ ERROR: Variables de entorno no configuradas\n');
  console.log('📝 CÓMO CONFIGURAR:');
  console.log('Opción 1 (Recomendado): Usar CLOUDINARY_URL');
  console.log('  $env:CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"');
  console.log('\nOpción 2: Variables individuales');
  console.log('  $env:CLOUDINARY_CLOUD_NAME="tu_cloud_name"');
  console.log('  $env:CLOUDINARY_API_KEY="tu_api_key"');
  console.log('  $env:CLOUDINARY_API_SECRET="tu_api_secret"');
  console.log('\n💻 Luego ejecuta:');
  console.log('  node scripts/upload-videos-cloudinary.js\n');
  process.exit(1);
}

const VIDEOS = [
  {
    filename: 'erp-demo.mp4',
    path: path.join(__dirname, '../public/videos/erp-demo.mp4'),
    publicId: 'portafolio/erp-demo'
  },
  {
    filename: 'vilok-demo.mp4',
    path: path.join(__dirname, '../public/videos/vilok-demo.mp4'),
    publicId: 'portafolio/vilok-demo'
  },
  {
    filename: 'tasadiv-demo.mp4',
    path: path.join(__dirname, '../public/videos/TasaDiv - Tasas de Cambio para Latinoamérica - Google Chrome 2025-11-11 17-23-33.mp4'),
    publicId: 'portafolio/tasadiv-demo'
  }
];

async function uploadVideo(video) {
  if (!fs.existsSync(video.path)) {
    console.log(`⚠️  No encontrado: ${video.filename}`);
    return null;
  }

  const stats = fs.statSync(video.path);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  const isLarge = stats.size > 100 * 1024 * 1024; // > 100MB

  console.log(`\n📤 Subiendo: ${video.filename} (${sizeMB} MB)...`);
  if (isLarge) {
    console.log(`   ⚠️  Video grande - usando upload_large con chunking...`);
  }

  try {
    // Para videos grandes (>100MB), usar upload_large con chunking
    const uploadOptions = {
      resource_type: 'video',
      public_id: video.publicId,
      folder: 'portafolio',
      overwrite: true,
      chunk_size: 20000000, // 20MB chunks para videos grandes
      eager: [],
      eager_async: false,
    };

    let result;
    if (isLarge) {
      // Usar upload_large para videos grandes
      result = await cloudinary.uploader.upload_large(video.path, uploadOptions);
      // upload_large devuelve un objeto diferente, construir URL manualmente
      const publicId = result.public_id || video.publicId;
      const url = cloudinary.url(publicId, {
        resource_type: 'video',
        secure: true
      });
      result.secure_url = url;
    } else {
      // Upload normal para videos pequeños
      result = await cloudinary.uploader.upload(video.path, uploadOptions);
    }

    console.log(`✅ ¡Subido exitosamente!`);
    console.log(`   URL: ${result.secure_url}`);

    return {
      filename: video.filename,
      publicId: video.publicId,
      url: result.secure_url,
      sizeMB: sizeMB
    };
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    if (error.message.includes('413') || error.message.includes('Payload Too Large')) {
      console.error(`   💡 Este video es demasiado grande para Cloudinary gratuito (límite 100MB)`);
      console.error(`   💡 Opciones:`);
      console.error(`      1. Comprimir el video antes de subirlo`);
      console.error(`      2. Usar YouTube u otro servicio para videos grandes`);
      console.error(`      3. Actualizar a plan de pago de Cloudinary`);
    }
    return null;
  }
}

async function main() {
  console.log('🚀 SUBIDA DE VIDEOS A CLOUDINARY\n');
  console.log('═'.repeat(60));

  const results = [];

  for (const video of VIDEOS) {
    const result = await uploadVideo(video);
    if (result) {
      results.push(result);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`\n📊 RESUMEN:`);
  console.log(`✅ ${results.length} de ${VIDEOS.length} videos subidos\n`);

  if (results.length > 0) {
    console.log('🔗 URLs GENERADAS - Copia esto:\n');
    
    results.forEach(({ filename, url }) => {
      console.log(`${filename}:`);
      console.log(`  ${url}\n`);
    });

    console.log('📝 PRÓXIMOS PASOS:');
    console.log('1. Abre: components/portfolio/Projects.tsx');
    console.log('2. Abre: app/projects/[id]/page.tsx');
    console.log('3. Reemplaza las rutas "/videos/..." con las URLs de arriba\n');
  }
}

main().catch(console.error);

