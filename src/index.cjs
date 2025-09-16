/**
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

module.exports = defaultExport;