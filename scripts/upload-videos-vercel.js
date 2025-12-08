/**
 * Script para subir videos a Vercel Blob Storage
 * 
 * REQUISITOS:
 * 1. Instalar: npm install @vercel/blob
 * 2. Obtener token: Ve a https://vercel.com/dashboard -> Settings -> Tokens
 * 3. Ejecutar: BLOB_READ_WRITE_TOKEN=tu_token node scripts/upload-videos-vercel.js
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

const VIDEOS_DIR = path.join(__dirname, '../public/videos');
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!TOKEN) {
  console.error('❌ Error: BLOB_READ_WRITE_TOKEN no está definido');
  console.log('\n📝 Pasos:');
  console.log('1. Ve a https://vercel.com/dashboard');
  console.log('2. Settings -> Tokens');
  console.log('3. Create Token (con permisos de Blob)');
  console.log('4. Ejecuta: $env:BLOB_READ_WRITE_TOKEN="tu_token" ; node scripts/upload-videos-vercel.js');
  process.exit(1);
}

const videos = [
  'erp-demo.mp4',
  'vilok-demo.mp4',
  'TasaDiv - Tasas de Cambio para Latinoamérica - Google Chrome 2025-11-11 17-23-33.mp4'
];

async function uploadVideo(filename) {
  const filePath = path.join(VIDEOS_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filename} no encontrado, saltando...`);
    return null;
  }

  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`📤 Subiendo ${filename} (${sizeMB} MB)...`);
  
  try {
    const file = fs.readFileSync(filePath);
    const blob = await put(filename, file, {
      access: 'public',
      token: TOKEN,
    });
    
    console.log(`✅ ${filename} subido exitosamente`);
    console.log(`   URL: ${blob.url}\n`);
    
    return {
      filename,
      url: blob.url,
      size: sizeMB
    };
  } catch (error) {
    console.error(`❌ Error subiendo ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Iniciando subida de videos a Vercel Blob Storage...\n');
  
  const results = [];
  
  for (const video of videos) {
    const result = await uploadVideo(video);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n📋 Resumen:');
  console.log(`✅ ${results.length} videos subidos exitosamente\n`);
  
  if (results.length > 0) {
    console.log('🔗 URLs generadas:');
    console.log('Actualiza estos archivos con las URLs:');
    console.log('  - components/portfolio/Projects.tsx');
    console.log('  - app/projects/[id]/page.tsx\n');
    
    results.forEach(({ filename, url }) => {
      console.log(`${filename}:`);
      console.log(`  ${url}\n`);
    });
  }
}

main().catch(console.error);

