#!/usr/bin/env node

/**
 * Build script to generate CommonJS versions of ESM modules
 * This ensures dual ESM/CommonJS support
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = join(__dirname, '../src');

console.log('🔨 Building CommonJS versions...\n');

// Convert ESM import/export to CommonJS require/module.exports
function convertToCommonJS(content, filename) {
  let converted = content;
  
  // Convert export statements
  converted = converted.replace(/export\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"];?/g, 
    (match, exports, module) => {
      const exportList = exports.split(',').map(e => e.trim());
      const requires = exportList.map(exp => `const { ${exp} } = require('${module.replace('.js', '.cjs')}');`).join('\n');
      const moduleExports = exportList.map(exp => `  ${exp},`).join('\n');
      return `${requires}\n\nmodule.exports = {\n${moduleExports}\n};`;
    });
  
  // Convert individual export functions
  converted = converted.replace(/export\s+function\s+(\w+)/g, 'function $1');
  converted = converted.replace(/export\s+async\s+function\s+(\w+)/g, 'async function $1');
  
  // Convert default export
  if (converted.includes('export default')) {
    // Extract function names from the file
    const functionMatches = content.match(/(?:export\s+)?(?:async\s+)?function\s+(\w+)/g);
    const functions = functionMatches ? functionMatches.map(match => 
      match.replace(/(?:export\s+)?(?:async\s+)?function\s+/, '')
    ) : [];
    
    if (filename === 'index.js') {
      // For index.js, we need to require all modules
      const moduleExports = `
// String utilities
const { slugify, toTitleCase, truncate } = require('./string.cjs');

// Date utilities
const { formatDate, timeAgo } = require('./date.cjs');

// Validation utilities
const { isEmail, isUrl, isEmpty } = require('./validate.cjs');

// Number utilities
const { commaNumber, randomInt, bytes } = require('./number.cjs');

// Array utilities
const { unique, chunk, shuffle } = require('./array.cjs');

// Object utilities
const { deepMerge, clone } = require('./object.cjs');

// Miscellaneous utilities
const { uuid, copyToClipboard, colorize } = require('./misc.cjs');

module.exports = {
  // String
  slugify,
  toTitleCase,
  truncate,
  // Date
  formatDate,
  timeAgo,
  // Validation
  isEmail,
  isUrl,
  isEmpty,
  // Number
  commaNumber,
  randomInt,
  bytes,
  // Array
  unique,
  chunk,
  shuffle,
  // Object
  deepMerge,
  clone,
  // Misc
  uuid,
  copyToClipboard,
  colorize
};

// Named exports
module.exports.slugify = slugify;
module.exports.toTitleCase = toTitleCase;
module.exports.truncate = truncate;
module.exports.formatDate = formatDate;
module.exports.timeAgo = timeAgo;
module.exports.isEmail = isEmail;
module.exports.isUrl = isUrl;
module.exports.isEmpty = isEmpty;
module.exports.commaNumber = commaNumber;
module.exports.randomInt = randomInt;
module.exports.bytes = bytes;
module.exports.unique = unique;
module.exports.chunk = chunk;
module.exports.shuffle = shuffle;
module.exports.deepMerge = deepMerge;
module.exports.clone = clone;
module.exports.uuid = uuid;
module.exports.copyToClipboard = copyToClipboard;
module.exports.colorize = colorize;`;
      
      converted = converted.replace(/export default[\s\S]*$/, moduleExports);
    } else {
      // For other files, export the functions
      const moduleExports = functions.map(fn => `module.exports.${fn} = ${fn};`).join('\n');
      converted = converted.replace(/export default[\s\S]*$/, moduleExports);
    }
  } else {
    // If no default export, add module.exports for individual functions
    const functionMatches = content.match(/(?:export\s+)?(?:async\s+)?function\s+(\w+)/g);
    if (functionMatches) {
      const functions = functionMatches.map(match => 
        match.replace(/(?:export\s+)?(?:async\s+)?function\s+/, '')
      );
      const moduleExports = functions.map(fn => `module.exports.${fn} = ${fn};`).join('\n');
      converted += '\n\n' + moduleExports;
    }
  }
  
  return converted;
}

// Get all JS files in src directory
const files = readdirSync(srcDir).filter(file => file.endsWith('.js'));

files.forEach(file => {
  const filePath = join(srcDir, file);
  const content = readFileSync(filePath, 'utf8');
  
  // Convert to CommonJS
  const cjsContent = convertToCommonJS(content, file);
  
  // Write CJS version
  const cjsPath = filePath.replace('.js', '.cjs');
  writeFileSync(cjsPath, cjsContent);
  
  console.log(`✅ Generated ${file.replace('.js', '.cjs')}`);
});

console.log('\n🎉 CommonJS build completed!');
console.log('📦 Package now supports both ESM and CommonJS imports');
