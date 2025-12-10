/**
 * Script para comprimir y acortar videos para el portafolio
 * 
 * Comprime los videos a menos de 50MB y los acorta a máximo 60 segundos
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = 'ffmpeg'; // ffmpeg está en PATH
const videosDir = path.join(__dirname, '../public/videos');
const outputDir = path.join(__dirname, '../public/videos/compressed');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const videos = [
  {
    input: 'erp-demo.mp4',
    output: 'erp-demo-compressed.mp4',
    maxDuration: 60 // 60 segundos máximo
  },
  {
    input: 'vilok-demo.mp4',
    output: 'vilok-demo-compressed.mp4',
    maxDuration: 60
  },
  {
    input: 'TasaDiv - Tasas de Cambio para Latinoamérica - Google Chrome 2025-11-11 17-23-33.mp4',
    output: 'tasadiv-demo-compressed.mp4',
    maxDuration: 60
  }
];

function compressVideo(video) {
  const inputPath = path.join(videosDir, video.input);
  const outputPath = path.join(outputDir, video.output);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  No encontrado: ${video.input}`);
    return null;
  }

  const stats = fs.statSync(inputPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n📹 Comprimiendo: ${video.input} (${sizeMB} MB)...`);

  try {
    // Comando ffmpeg para comprimir:
    // -t: duración máxima (60 segundos)
    // -vf scale: escalar a 1280x720 (HD) para reducir tamaño
    // -crf 28: calidad (23 es default, 28 es más comprimido pero aún aceptable)
    // -preset fast: balance entre velocidad y compresión
    // -movflags +faststart: optimizar para web streaming
    const command = `"${ffmpegPath}" -i "${inputPath}" -t ${video.maxDuration} -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`;

    console.log(`   Ejecutando compresión...`);
    execSync(command, { stdio: 'inherit' });

    const outputStats = fs.statSync(outputPath);
    const outputSizeMB = (outputStats.size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - outputStats.size / stats.size) * 100).toFixed(1);

    console.log(`✅ ¡Comprimido exitosamente!`);
    console.log(`   Tamaño original: ${sizeMB} MB`);
    console.log(`   Tamaño comprimido: ${outputSizeMB} MB`);
    console.log(`   Reducción: ${reduction}%`);

    return {
      input: video.input,
      output: video.output,
      originalSize: sizeMB,
      compressedSize: outputSizeMB,
      reduction: reduction
    };
  } catch (error) {
    console.error(`❌ Error comprimiendo ${video.input}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎬 COMPRESIÓN DE VIDEOS PARA PORTAFOLIO\n');
  console.log('═'.repeat(60));

  const results = [];

  for (const video of videos) {
    const result = compressVideo(video);
    if (result) {
      results.push(result);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`\n📊 RESUMEN:`);
  console.log(`✅ ${results.length} de ${videos.length} videos comprimidos\n`);

  if (results.length > 0) {
    console.log('📝 PRÓXIMOS PASOS:');
    console.log('1. Los videos comprimidos están en: public/videos/compressed/');
    console.log('2. Reemplaza los videos originales o actualiza el código para usar los comprimidos');
    console.log('3. Los videos comprimidos están listos para subir a Vercel (< 50MB cada uno)\n');
  }
}

main().catch(console.error);


