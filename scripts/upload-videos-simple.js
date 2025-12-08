/**
 * Script SIMPLIFICADO para subir videos a Vercel Blob Storage
 * 
 * PASOS:
 * 1. npm install @vercel/blob
 * 2. Obtén token: https://vercel.com/dashboard -> Settings -> Tokens -> Create Token
 * 3. Ejecuta este script con el token como variable de entorno
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.VERCEL_BLOB_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;

if (!TOKEN) {
  console.error('\n❌ ERROR: Token no encontrado\n');
  console.log('📝 CÓMO OBTENER EL TOKEN:');
  console.log('1. Ve a: https://vercel.com/dashboard');
  console.log('2. Click en tu perfil (arriba derecha)');
  console.log('3. Ve a "Settings"');
  console.log('4. Ve a "Tokens"');
  console.log('5. Click en "Create Token"');
  console.log('6. Nombre: "blob-videos"');
  console.log('7. Copia el token generado\n');
  console.log('💻 EJECUTAR:');
  console.log('  PowerShell: $env:VERCEL_BLOB_TOKEN="tu_token_aqui" ; node scripts/upload-videos-simple.js');
  console.log('  CMD: set VERCEL_BLOB_TOKEN=tu_token_aqui && node scripts/upload-videos-simple.js\n');
  process.exit(1);
}

const VIDEOS = [
  {
    filename: 'erp-demo.mp4',
    path: path.join(__dirname, '../public/videos/erp-demo.mp4')
  },
  {
    filename: 'vilok-demo.mp4',
    path: path.join(__dirname, '../public/videos/vilok-demo.mp4')
  },
  {
    filename: 'tasadiv-demo.mp4',
    path: path.join(__dirname, '../public/videos/TasaDiv - Tasas de Cambio para Latinoamérica - Google Chrome 2025-11-11 17-23-33.mp4'),
    blobName: 'tasadiv-demo.mp4' // Nombre más simple para el blob
  }
];

async function uploadVideo(video) {
  if (!fs.existsSync(video.path)) {
    console.log(`⚠️  No encontrado: ${video.filename}`);
    return null;
  }

  const stats = fs.statSync(video.path);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  const blobName = video.blobName || video.filename;

  console.log(`\n📤 Subiendo: ${video.filename} (${sizeMB} MB)...`);

  try {
    const file = fs.readFileSync(video.path);
    
    const blob = await put(blobName, file, {
      access: 'public',
      token: TOKEN,
      addRandomSuffix: false,
    });

    console.log(`✅ ¡Subido exitosamente!`);
    console.log(`   URL: ${blob.url}`);

    return {
      filename: video.filename,
      blobName: blobName,
      url: blob.url,
      sizeMB: sizeMB
    };
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 SUBIDA DE VIDEOS A VERCEL BLOB STORAGE\n');
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
    console.log('🔗 URLs GENERADAS - Copia esto y actualiza el código:\n');
    
    results.forEach(({ filename, url, blobName }) => {
      console.log(`${filename}:`);
      console.log(`  URL: ${url}\n`);
    });

    console.log('📝 PRÓXIMOS PASOS:');
    console.log('1. Abre: components/portfolio/Projects.tsx');
    console.log('2. Abre: app/projects/[id]/page.tsx');
    console.log('3. Reemplaza las rutas "/videos/..." con las URLs de arriba\n');
  }
}

main().catch(console.error);

