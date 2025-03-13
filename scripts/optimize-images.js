#!/usr/bin/env node

/**
 * This script optimizes images in the public directory
 * Run with: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp for image optimization...');
  execSync('npm install sharp --save-dev');
}

const sharp = require('sharp');

// Directories to scan for images
const DIRS_TO_SCAN = [
  path.join(__dirname, '../public'),
];

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Skip files with these strings in their path
const SKIP_PATTERNS = [
  'node_modules',
  '.next',
  '.git',
  'optimized-',
];

// Configuration for different image sizes
const SIZES = [
  { width: 640, suffix: 'sm' },
  { width: 1024, suffix: 'md' },
  { width: 1920, suffix: 'lg' },
];

// Quality settings
const QUALITY_SETTINGS = {
  jpeg: 80,
  webp: 75,
  png: 80,
};

// Counter for stats
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  savedBytes: 0,
};

/**
 * Check if a file should be processed
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Check extension
  if (!IMAGE_EXTENSIONS.includes(ext)) {
    return false;
  }
  
  // Check skip patterns
  if (SKIP_PATTERNS.some(pattern => filePath.includes(pattern))) {
    return false;
  }
  
  return true;
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  
  // Get original file size
  const originalSize = fs.statSync(filePath).size;
  
  try {
    // Load the image
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Skip if image is already small
    if (metadata.width < 640 && metadata.height < 640) {
      console.log(`Skipping small image: ${filePath}`);
      stats.skipped++;
      return;
    }
    
    // Create WebP version
    const webpOptions = { quality: QUALITY_SETTINGS.webp };
    await image.webp(webpOptions).toFile(path.join(dir, `${baseName}.webp`));
    
    // Create responsive versions
    for (const size of SIZES) {
      // Skip if original is smaller than this size
      if (metadata.width <= size.width) continue;
      
      // Resize and optimize
      const resized = sharp(filePath)
        .resize(size.width, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        });
      
      // Save as WebP
      await resized
        .webp(webpOptions)
        .toFile(path.join(dir, `${baseName}-${size.suffix}.webp`));
      
      // Save in original format
      if (ext === '.jpg' || ext === '.jpeg') {
        await resized
          .jpeg({ quality: QUALITY_SETTINGS.jpeg })
          .toFile(path.join(dir, `${baseName}-${size.suffix}${ext}`));
      } else if (ext === '.png') {
        await resized
          .png({ quality: QUALITY_SETTINGS.png })
          .toFile(path.join(dir, `${baseName}-${size.suffix}${ext}`));
      }
    }
    
    // Calculate saved bytes
    const newFiles = fs.readdirSync(dir)
      .filter(file => file.startsWith(baseName) && file !== path.basename(filePath))
      .map(file => path.join(dir, file));
    
    const newTotalSize = newFiles.reduce((sum, file) => sum + fs.statSync(file).size, 0);
    stats.savedBytes += originalSize - (newTotalSize / newFiles.length); // Average savings
    
    stats.processed++;
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Scan a directory recursively for images
 */
async function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      await optimizeImage(fullPath);
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting image optimization...');
  
  for (const dir of DIRS_TO_SCAN) {
    if (fs.existsSync(dir)) {
      await scanDirectory(dir);
    }
  }
  
  console.log('\nOptimization complete!');
  console.log(`Processed: ${stats.processed} images`);
  console.log(`Skipped: ${stats.skipped} images`);
  console.log(`Errors: ${stats.errors}`);
  console.log(`Saved approximately: ${(stats.savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error); 