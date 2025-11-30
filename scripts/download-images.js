const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Crear carpeta public si no existe
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const images = {
  'avatar.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
  'project_1.jpg': 'https://images.unsplash.com/photo-1522071820081-004f01515fa2?w=1200&h=600&fit=crop&q=80',
  'project_2.jpg': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop&q=80',
  'extra_1.jpg': 'https://images.unsplash.com/photo-1517694471114-924202997900?w=800&h=600&fit=crop&q=80',
  'extra_2.jpg': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop&q=80',
  'extra_3.jpg': 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop&q=80',
};

function downloadImage(filename, url) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(publicDir, filename);
    
    // Si la imagen ya existe, saltarla
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  ${filename} ya existe, saltando...`);
      resolve();
      return;
    }

    console.log(`⬇️  Descargando ${filename}...`);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ ${filename} descargado`);
          resolve();
        });
      } else {
        console.error(`❌ Error descargando ${filename}: ${response.statusCode}`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`❌ Error descargando ${filename}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('🚀 Iniciando descarga de imágenes...\n');
  
  try {
    const promises = Object.entries(images).map(([filename, url]) =>
      downloadImage(filename, url)
    );
    
    await Promise.all(promises);
    console.log('\n✅ Todas las imágenes descargadas correctamente');
  } catch (error) {
    console.error('\n❌ Error durante la descarga:', error);
    process.exit(1);
  }
}

downloadAll();

