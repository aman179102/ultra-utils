/**
 * Ultra Utils - A lightweight, zero-dependency utility library
 * @version 1.0.0
 */

// String utilities
export { slugify, toTitleCase, truncate } from './string.js';

// Date utilities
export { formatDate, timeAgo } from './date.js';

// Validation utilities
export { isEmail, isUrl, isEmpty } from './validate.js';

// Number utilities
export { commaNumber, randomInt, bytes } from './number.js';

// Array utilities
export { unique, chunk, shuffle } from './array.js';

// Object utilities
export { deepMerge, clone } from './object.js';

// Miscellaneous utilities
export { uuid, copyToClipboard, colorize } from './misc.js';

// Import all functions for default export
import { slugify, toTitleCase, truncate } from './string.js';
import { formatDate, timeAgo } from './date.js';
import { isEmail, isUrl, isEmpty } from './validate.js';
import { commaNumber, randomInt, bytes } from './number.js';
import { unique, chunk, shuffle } from './array.js';
import { deepMerge, clone } from './object.js';
import { uuid, copyToClipboard, colorize } from './misc.js';

// Default export with all functions
export default {
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
