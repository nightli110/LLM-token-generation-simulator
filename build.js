const fs = require('fs');
const path = require('path');

const outputDir = '.'; // Output to the root directory for GitHub Pages

// Copy static files
const staticFiles = [
    'index.html',
    'js/include-html.js',
    'js/data/sample-text.js',
    'js/data/benchmarks.js',
    'js/main.js',
    'components/navbar.html',
    'components/footer.html'
];

staticFiles.forEach(file => {
    const sourcePath = path.join(__dirname, file);
    const destPath = path.join(outputDir, file);
    
    // Create directories if they don't exist
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    
    fs.copyFileSync(sourcePath, destPath);
});

// Process blog posts
const postsDir = path.join(__dirname, 'posts');
const template = fs.readFileSync(path.join(__dirname, 'templates', 'blog-post.html'), 'utf8');

fs.readdirSync(postsDir).forEach(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const [_, frontMatter, markdown] = content.split('---');
    const metadata = parseFrontMatter(frontMatter);
    
    let html = template
        .replace('{{TITLE}}', metadata.title)
        .replace('{{DESCRIPTION}}', metadata.description)
        .replace('{{CONTENT}}', convertMarkdownToHtml(markdown));

    fs.writeFileSync(path.join(outputDir, `${path.parse(file).name}.html`), html);
});

// Implement parseFrontMatter and convertMarkdownToHtml functions
function parseFrontMatter(frontMatter) {
    // Implement front matter parsing logic
}

function convertMarkdownToHtml(markdown) {
    // Implement Markdown to HTML conversion logic
}