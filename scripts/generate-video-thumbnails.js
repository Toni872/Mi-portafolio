/**
 * Script para generar GIFs de miniaturas de videos
 * 
 * Genera GIFs cortos (3-5 segundos) a partir de los videos para usar como miniaturas
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = 'ffmpeg'; // ffmpeg está en PATH
const videosDir = path.join(__dirname, '../public/videos');
const outputDir = path.join(__dirname, '../public/videos/thumbnails');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const videos = [
  {
    input: 'erp-demo.mp4',
    output: 'erp-demo-thumbnail.gif',
    startTime: 2, // Empezar a los 2 segundos
    duration: 4 // 4 segundos de duración
  },
  {
    input: 'vilok-demo.mp4',
    output: 'vilok-demo-thumbnail.gif',
    startTime: 2,
    duration: 4
  },
  {
    input: 'tasadiv-demo.mp4',
    output: 'tasadiv-demo-thumbnail.gif',
    startTime: 1,
    duration: 4
  }
];

function generateGif(video) {
  const inputPath = path.join(videosDir, video.input);
  const outputPath = path.join(outputDir, video.output);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  No encontrado: ${video.input}`);
    return null;
  }

  console.log(`\n🎬 Generando GIF: ${video.input}...`);
  console.log(`   Duración: ${video.duration}s, Inicio: ${video.startTime}s`);

  try {
    // Comando ffmpeg para generar GIF:
    // -ss: tiempo de inicio
    // -t: duración
    // -vf: filtros de video (escalar a 640px de ancho, fps reducido a 10 para reducir tamaño)
    // -r: frame rate del GIF (10 fps es suficiente para miniaturas)
    // -loop: hacer loop del GIF
    const command = `"${ffmpegPath}" -ss ${video.startTime} -i "${inputPath}" -t ${video.duration} -vf "fps=10,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 -y "${outputPath}"`;

    console.log(`   Ejecutando conversión...`);
    execSync(command, { stdio: 'inherit' });

    const outputStats = fs.statSync(outputPath);
    const outputSizeMB = (outputStats.size / (1024 * 1024)).toFixed(2);

    console.log(`✅ ¡GIF generado exitosamente!`);
    console.log(`   Tamaño: ${outputSizeMB} MB`);
    console.log(`   Ruta: ${outputPath}`);

    return {
      input: video.input,
      output: video.output,
      sizeMB: outputSizeMB
    };
  } catch (error) {
    console.error(`❌ Error generando GIF ${video.input}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎬 GENERACIÓN DE GIFs MINIATURA PARA VIDEOS\n');
  console.log('═'.repeat(60));

  const results = [];

  for (const video of videos) {
    const result = generateGif(video);
    if (result) {
      results.push(result);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`\n📊 RESUMEN:`);
  console.log(`✅ ${results.length} de ${videos.length} GIFs generados\n`);

  if (results.length > 0) {
    console.log('📝 PRÓXIMOS PASOS:');
    console.log('1. Los GIFs están en: public/videos/thumbnails/');
    console.log('2. Actualiza el código para usar los GIFs como miniaturas');
    console.log('3. Los GIFs se mostrarán en las tarjetas de proyectos\n');
    
    results.forEach(({ output, sizeMB }) => {
      console.log(`   - ${output} (${sizeMB} MB)`);
    });
  }
}

main().catch(console.error);


