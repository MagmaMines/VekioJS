#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

function convertEsmToCjs(content, filePath) {
  let result = content;
  
  // Convert import statements to require
  result = result.replace(/import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g, 
    (match, imports, source) => {
      const cleanImports = imports.split(',').map(i => i.trim()).join(', ');
      return `const { ${cleanImports} } = require('${source}');`;
    });
  
  result = result.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g,
    (match, name, source) => `const ${name} = require('${source}');`);
  
  result = result.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g,
    (match, name, source) => `const ${name} = require('${source}');`);
  
  // Convert export statements to module.exports
  result = result.replace(/export\s+\{([^}]+)\}/g, (match, exports) => {
    const items = exports.split(',').map(i => i.trim());
    const exportStmt = items.map(item => {
      const [name, alias] = item.split(' as ').map(s => s.trim());
      return `${alias || name}: ${name}`;
    }).join(', ');
    return `module.exports = { ${exportStmt} };`;
  });
  
  result = result.replace(/export\s+default\s+(\w+)/g, 'module.exports = $1;');
  result = result.replace(/export\s+(const|function|class)\s+(\w+)/g, 'exports.$2 = $2;');
  
  return result;
}

function walkDir(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (item.endsWith('.js') && !item.endsWith('.d.ts')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

try {
  const jsFiles = walkDir(distDir);
  
  jsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const cjsContent = convertEsmToCjs(content, file);
    const cjsPath = file.replace(/\.js$/, '.cjs');
    
    fs.writeFileSync(cjsPath, cjsContent, 'utf-8');
  });
  
  // Create main CJS entry point
  const mainIndexPath = path.join(distDir, 'index.cjs');
  const esmIndexPath = path.join(distDir, 'index.js');
  
  if (fs.existsSync(esmIndexPath)) {
    const content = fs.readFileSync(esmIndexPath, 'utf-8');
    const cjsContent = convertEsmToCjs(content, esmIndexPath);
    fs.writeFileSync(mainIndexPath, cjsContent, 'utf-8');
  }
  
  console.log('✓ CommonJS build complete');
} catch (err) {
  console.error('✗ CJS build failed:', err.message);
  process.exit(1);
}
