import fs from 'node:fs';

const files = ['dist/runtime/index.js', 'dist/presets/index.js', 'dist/renderer/index.js'];
const budgetKB = 120;
let total = 0;
for (const file of files) {
  const size = fs.statSync(file).size;
  total += size;
  console.log(file, (size / 1024).toFixed(2), 'KB');
}
const totalKB = total / 1024;
console.log('Total KB:', totalKB.toFixed(2), 'Budget KB:', budgetKB);
if (totalKB > budgetKB) process.exit(1);
