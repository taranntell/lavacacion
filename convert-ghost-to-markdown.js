const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

// Initialize turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Function to safely escape YAML strings
function escapeYamlString(str) {
  if (!str) return '';
  
  // Replace quotes and escape special characters
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Read the Ghost export file
const ghostExport = JSON.parse(fs.readFileSync('./content/la-vacacion.ghost.2025-05-25-13-26-55.json', 'utf8'));

// Create posts directory if it doesn't exist
const postsDir = './src/posts';
if (!fs.existsSync('./src')) {
  fs.mkdirSync('./src');
}
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Extract posts from the Ghost export
const posts = ghostExport.db[0].data.posts;

console.log(`Found ${posts.length} posts to convert`);

posts.forEach((post, index) => {
  // Skip drafts
  if (post.status !== 'published') {
    console.log(`Skipping draft: ${post.title}`);
    return;
  }

  // Convert HTML content to Markdown
  let content = post.html || '';
  
  // Clean up Ghost-specific URLs
  content = content.replace(/__GHOST_URL__/g, '');
  
  // Convert HTML to Markdown
  const markdown = turndownService.turndown(content);
  
  // Create frontmatter with proper escaping
  const publishedDate = new Date(post.published_at);
  const title = escapeYamlString(post.title);
  const excerpt = escapeYamlString(post.custom_excerpt || post.plaintext.substring(0, 160));
  const featuredImage = post.feature_image || '';
  
  const frontmatter = `---
title: "${title}"
date: ${publishedDate.toISOString()}
slug: ${post.slug}
excerpt: "${excerpt}..."
featured_image: ${featuredImage}
tags:
  - travel
  - europe
  - germany
---

`;

  // Combine frontmatter and content
  const fullContent = frontmatter + markdown;
  
  // Create filename with date prefix for proper sorting
  const datePrefix = publishedDate.toISOString().split('T')[0];
  const filename = `${datePrefix}-${post.slug}.md`;
  const filepath = path.join(postsDir, filename);
  
  // Write the markdown file
  fs.writeFileSync(filepath, fullContent, 'utf8');
  console.log(`✓ Converted: ${filename}`);
});

console.log('\n✅ Conversion complete! Posts saved to ./src/posts/'); 