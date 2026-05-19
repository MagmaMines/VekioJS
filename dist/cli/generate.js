#!/usr/bin/env node
import fs from 'node:fs';
const name = process.argv[2] || 'Button';
const file = `${name}.vekio.tsx`;
const content = `export function ${name}(){\n  return Vekio.createElement('button',{preset:'preset0001'},'${name}');\n}\n`;
fs.writeFileSync(file, content);
console.log(`Generated ${file}`);
