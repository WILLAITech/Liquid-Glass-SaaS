const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

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

    // Generate favicon.ico (multi-size: 16x16, 32x32, 48x48)
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map(size => 
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );
    
    const icoBuffer = await toIco(pngBuffers);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('✅ favicon.ico generated');

    // Generate apple-touch-icon.png (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png generated');

    console.log('Icon generation completed!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Execute generation
generateIcons(); 