import fs from 'fs';
import path from 'path';

const SRC = 'src';

function findFiles(dir, exts) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findFiles(fullPath, exts));
    } else if (exts.some(ext => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findFiles(SRC, ['.ts', '.tsx']);
let removed = 0;
let kept = 0;

for (const fp of files) {
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;

  // Check if file has `import React from 'react';`
  if (!content.includes("import React from 'react'")) continue;

  // Check if the file actually uses React. (React.FC, React.Children, etc.)
  // Remove the import line itself for the check
  const withoutImport = content.replace(/import React from 'react';\r?\n?/g, '');
  const usesReactDot = /React\./.test(withoutImport);

  if (usesReactDot) {
    // File uses React.something — keep the import
    kept++;
    console.log('KEPT (uses React.):', path.relative('.', fp));
    continue;
  }

  const simpleImport = /^import React from 'react';\r?\n/m;
  if (simpleImport.test(content)) {
    content = content.replace(simpleImport, '');

    content = content.replace(/^\n+/, '');
  }

  if (content !== original) {
    fs.writeFileSync(fp, content);
    removed++;
    console.log('REMOVED:', path.relative('.', fp));
  }
}

console.log(`\nDone. Removed: ${removed}, Kept (uses React.): ${kept}`);
