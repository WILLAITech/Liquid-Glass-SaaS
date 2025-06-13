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

// Generate different size icons
async function generateIcons() {
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

  // Generate icon-192x192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192x192.png'));
  console.log('✅ icon-192x192.png generated');

  // Generate icon-512x512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512x512.png'));
  console.log('✅ icon-512x512.png generated');

  // Generate og-image.png (1200x630)
  await generateOgImage();

  // Generate twitter-image.png (1200x600)
  await generateTwitterImage();

  console.log('All icons generated successfully!');
}

// Generate Open Graph image
async function generateOgImage() {
  // Create a 1200x630 image with gradient background and centered icon
  const width = 1200;
  const height = 630;
  const iconSize = 250;
  
  const canvas = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 26, g: 26, b: 42, alpha: 1 }
    }
  });

  // Resize SVG icon
  const resizedIcon = await sharp(svgBuffer)
    .resize(iconSize, iconSize)
    .toBuffer();

  // Place icon in the center of the canvas
  await canvas
    .composite([
      {
        input: resizedIcon,
        top: Math.floor((height - iconSize) / 2),
        left: Math.floor((width - iconSize) / 2)
      }
    ])
    .toFile(path.join(publicDir, 'og-image.png'));
  
  console.log('✅ og-image.png generated');
}

// Generate Twitter image
async function generateTwitterImage() {
  // Reuse OG image but with different dimensions
  const width = 1200;
  const height = 600;
  const iconSize = 250;
  
  const canvas = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 26, g: 26, b: 42, alpha: 1 }
    }
  });

  // Resize SVG icon
  const resizedIcon = await sharp(svgBuffer)
    .resize(iconSize, iconSize)
    .toBuffer();

  // Place icon in the center of the canvas
  await canvas
    .composite([
      {
        input: resizedIcon,
        top: Math.floor((height - iconSize) / 2),
        left: Math.floor((width - iconSize) / 2)
      }
    ])
    .toFile(path.join(publicDir, 'twitter-image.png'));
  
  console.log('✅ twitter-image.png generated');
}

// Execute generation
generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
}); 