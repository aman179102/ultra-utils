/**
 * Ultra Utils - A lightweight, zero-dependency utility library
 * @version 1.0.0
 */

// Import all utility functions
import * as stringUtils from './string.js';
import * as dateUtils from './date.js';
import * as validateUtils from './validate.js';
import * as numberUtils from './number.js';
import * as arrayUtils from './array.js';
import * as objectUtils from './object.js';
import * as miscUtils from './misc.js';
import * as fsUtils from './fs.js';
import * as cryptoUtils from './crypto.js';
import * as colorUtils from './color.js';
import * as urlUtils from './url.js';

// Export individual modules
export * from './string.js';
export * from './date.js';
export * from './validate.js';
export * from './number.js';
export * from './array.js';
export * from './object.js';
export * from './misc.js';
export * from './fs.js';
export * from './crypto.js';
export * from './color.js';
export * from './url.js';

// Export grouped modules
export {
  stringUtils,
  dateUtils,
  validateUtils,
  numberUtils,
  arrayUtils,
  objectUtils,
  miscUtils,
  fsUtils,
  cryptoUtils,
  colorUtils,
  urlUtils
};

// Default export with all functions
export default {
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
