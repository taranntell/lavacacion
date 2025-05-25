const fs = require('fs');
const path = require('path');

const postsDir = './src/posts';
const markdownFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

console.log(`Fixing image paths in ${markdownFiles.length} markdown files...`);

let totalReplacements = 0;

markdownFiles.forEach(file => {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;
  
  // Replace image paths in markdown format ![alt](path)
  content = content.replace(/!\[([^\]]*)\]\(\/content\/images\/[^\/]+\/[^\/]+\/([^)]+)\)/g, (match, alt, filename) => {
    fileReplacements++;
    return `![${alt}](/images/${filename})`;
  });
  
  // Replace image paths in HTML img tags
  content = content.replace(/<img([^>]+)src="\/content\/images\/[^\/]+\/[^\/]+\/([^"]+)"([^>]*)>/g, (match, before, filename, after) => {
    fileReplacements++;
    return `<img${before}src="/images/${filename}"${after}>`;
  });
  
  // Replace featured_image paths in frontmatter
  content = content.replace(/featured_image:\s*\/content\/images\/[^\/]+\/[^\/]+\/([^\s]+)/g, (match, filename) => {
    fileReplacements++;
    return `featured_image: /images/${filename}`;
  });
  
  // Replace featured_image paths with __GHOST_URL__ prefix
  content = content.replace(/featured_image:\s*__GHOST_URL__\/content\/images\/[^\/]+\/[^\/]+\/([^\s]+)/g, (match, filename) => {
    fileReplacements++;
    return `featured_image: /images/${filename}`;
  });
  
  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${fileReplacements} image paths in ${file}`);
    totalReplacements += fileReplacements;
  }
});

console.log(`\n✅ Total image paths fixed: ${totalReplacements}`); 