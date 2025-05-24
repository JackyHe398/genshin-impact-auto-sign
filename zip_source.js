// zip_source.js
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const ignore = require('ignore');

const OUTPUT_DIR = path.resolve(__dirname, 'dist', 'zip');
const OUTPUT_NAME = 'source-code.zip';
const OUTPUT_PATH = path.join(OUTPUT_DIR, OUTPUT_NAME);

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const output = fs.createWriteStream(OUTPUT_PATH);
const archive = archiver('zip', { zlib: { level: 9 } });

// Listen for archive completion
output.on('close', () => {
  console.log(`${OUTPUT_NAME} created in dist/zip: ${archive.pointer()} total bytes`);
});
archive.on('warning', err => {
  if (err.code === 'ENOENT') console.warn(err);
  else throw err;
});
archive.on('error', err => { throw err; });

// Pipe archive data to the file
archive.pipe(output);

// Read .gitignore patterns or fallback to default
let ig = ignore();
try {
  const gitignorePath = path.resolve(__dirname, '.gitignore');
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  ig = ig.add(gitignoreContent);
  console.log("Loaded ignore patterns from .gitignore.");
} catch (err) {
  console.error("Error reading .gitignore:", err.message);
  console.warn("Using default ignore patterns.");
  ig = ig.add([
    'node_modules/**',
    'dist/**',
    'todo.txt',
    '*.zip',
    '*.xpi',
    '*.log',
    '.git/**',
    '.vscode/**'
  ]);
}

// Include all files (dot:true to grab .gitignore, etc.)
const allFiles = [];
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(__dirname, fullPath);
    if (ig.ignores(relPath)) continue;
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      allFiles.push(relPath);
    }
  }
}
walkDir(__dirname);

for (const file of allFiles) {
  archive.file(path.join(__dirname, file), { name: file });
}

// Finalize the archive
archive.finalize();
