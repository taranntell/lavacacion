const fs = require('fs');
const path = require('path');

// Create images directory in src if it doesn't exist
const srcImagesDir = './src/images';
if (!fs.existsSync(srcImagesDir)) {
  fs.mkdirSync(srcImagesDir, { recursive: true });
}

// Read the Ghost export to get all used images
const ghostExport = JSON.parse(fs.readFileSync('./content/la-vacacion.ghost.2025-05-25-13-26-55.json', 'utf8'));
const posts = ghostExport.db[0].data.posts;

const usedImages = new Set();

// Extract images from posts
posts.forEach(post => {
  // Check featured image
  if (post.feature_image) {
    const imagePath = post.feature_image.replace('__GHOST_URL__/', '');
    if (imagePath.startsWith('content/images/')) {
      usedImages.add(imagePath);
    }
  }
  
  // Check images in HTML content
  if (post.html) {
    const imageRegex = /<img[^>]+src="([^"]*)"[^>]*>/g;
    let match;
    while ((match = imageRegex.exec(post.html)) !== null) {
      let imagePath = match[1];
      // Clean up the path
      imagePath = imagePath.replace('__GHOST_URL__/', '');
      if (imagePath.startsWith('content/images/')) {
        usedImages.add(imagePath);
      }
    }
  }
});

console.log(`Found ${usedImages.size} unique images used in posts:`);

// Copy used images to src/images
let copiedCount = 0;
let notFoundCount = 0;

usedImages.forEach(imagePath => {
  const sourcePath = `./${imagePath}`;
  const fileName = path.basename(imagePath);
  const destPath = path.join(srcImagesDir, fileName);
  
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✓ Copied: ${fileName}`);
      copiedCount++;
    } else {
      console.log(`✗ Not found: ${imagePath}`);
      notFoundCount++;
    }
  } catch (error) {
    console.log(`✗ Error copying ${fileName}: ${error.message}`);
    notFoundCount++;
  }
});

console.log(`\n✅ Summary:`);
console.log(`- Images copied: ${copiedCount}`);
console.log(`- Images not found: ${notFoundCount}`);
console.log(`- Total unique images referenced: ${usedImages.size}`);

// Also check for any images in the markdown files we created
console.log(`\nChecking converted markdown files for additional images...`);

const postsDir = './src/posts';
const markdownFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

markdownFiles.forEach(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const imageRegex = /!\[.*?\]\(([^)]+)\)/g;
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    let imagePath = match[1];
    if (imagePath.includes('content/images/')) {
      console.log(`Found image in ${file}: ${imagePath}`);
    }
  }
});

console.log(`\n📁 Images are now available in: ${srcImagesDir}`); 