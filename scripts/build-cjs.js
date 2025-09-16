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
  
  // Handle Node.js crypto imports for crypto.js
  if (filename === 'crypto.js') {
    converted = converted.replace(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]crypto['"];?/g, 
      (match, imports) => {
        return `const { ${imports} } = require('crypto');`;
      });
  }
  
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
      // For index.js, we need to require all modules and export everything
      const indexCjsContent = `/**
 * Ultra Utils - A lightweight, zero-dependency utility library
 * @version 1.0.0
 */

// Import all utility functions
const stringUtils = require('./string.cjs');
const dateUtils = require('./date.cjs');
const validateUtils = require('./validate.cjs');
const numberUtils = require('./number.cjs');
const arrayUtils = require('./array.cjs');
const objectUtils = require('./object.cjs');
const miscUtils = require('./misc.cjs');
const fsUtils = require('./fs.cjs');
const cryptoUtils = require('./crypto.cjs');
const colorUtils = require('./color.cjs');
const urlUtils = require('./url.cjs');

// Export individual functions
Object.assign(module.exports, stringUtils);
Object.assign(module.exports, dateUtils);
Object.assign(module.exports, validateUtils);
Object.assign(module.exports, numberUtils);
Object.assign(module.exports, arrayUtils);
Object.assign(module.exports, objectUtils);
Object.assign(module.exports, miscUtils);
Object.assign(module.exports, fsUtils);
Object.assign(module.exports, cryptoUtils);
Object.assign(module.exports, colorUtils);
Object.assign(module.exports, urlUtils);

// Export grouped modules
module.exports.stringUtils = stringUtils;
module.exports.dateUtils = dateUtils;
module.exports.validateUtils = validateUtils;
module.exports.numberUtils = numberUtils;
module.exports.arrayUtils = arrayUtils;
module.exports.objectUtils = objectUtils;
module.exports.miscUtils = miscUtils;
module.exports.fsUtils = fsUtils;
module.exports.cryptoUtils = cryptoUtils;
module.exports.colorUtils = colorUtils;
module.exports.urlUtils = urlUtils;

// Default export with all functions
const defaultExport = {
  // String utilities (30+ functions)
  ...stringUtils,
  
  // Date utilities (25+ functions)
  ...dateUtils,
  
  // Validation utilities
  ...validateUtils,
  
  // Number utilities (15+ functions)
  ...numberUtils,
  
  // Array utilities (20+ functions)
  ...arrayUtils,
  
  // Object utilities (15+ functions)
  ...objectUtils,
  
  // File system utilities (10+ functions)
  ...fsUtils,
  
  // Crypto utilities (13+ functions)
  ...cryptoUtils,
  
  // Color utilities (15+ functions)
  ...colorUtils,
  
  // URL utilities (15+ functions)
  ...urlUtils,
  
  // Miscellaneous utilities
  ...miscUtils
};

module.exports = defaultExport;`;
      
      converted = indexCjsContent;
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
console.log(`📊 Generated ${files.length} CommonJS modules with 100+ utility functions`);
