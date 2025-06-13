const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read SVG source file
const svgBuffer = fs.readFileSync(path.join(publicDir, 'favicon.svg'));

// Generate icons
async function generateIcons() {
  try {
    console.log('Starting icon generation...');

    // Generate favicon.ico (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✅ favicon.ico generated');
    console.log('Icon generation completed!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Execute generation
generateIcons(); 