/**
 * Ultra Utils - A lightweight, zero-dependency utility library
 * @version 1.0.0
 */

// String utilities
const { slugify } = require('./string.cjs');
const { toTitleCase } = require('./string.cjs');
const { truncate } = require('./string.cjs');

module.exports = {
  slugify,
  toTitleCase,
  truncate,
};

// Date utilities
const { formatDate } = require('./date.cjs');
const { timeAgo } = require('./date.cjs');

module.exports = {
  formatDate,
  timeAgo,
};

// Validation utilities
const { isEmail } = require('./validate.cjs');
const { isUrl } = require('./validate.cjs');
const { isEmpty } = require('./validate.cjs');

module.exports = {
  isEmail,
  isUrl,
  isEmpty,
};

// Number utilities
const { commaNumber } = require('./number.cjs');
const { randomInt } = require('./number.cjs');
const { bytes } = require('./number.cjs');

module.exports = {
  commaNumber,
  randomInt,
  bytes,
};

// Array utilities
const { unique } = require('./array.cjs');
const { chunk } = require('./array.cjs');
const { shuffle } = require('./array.cjs');

module.exports = {
  unique,
  chunk,
  shuffle,
};

// Object utilities
const { deepMerge } = require('./object.cjs');
const { clone } = require('./object.cjs');

module.exports = {
  deepMerge,
  clone,
};

// Miscellaneous utilities
const { uuid } = require('./misc.cjs');
const { copyToClipboard } = require('./misc.cjs');
const { colorize } = require('./misc.cjs');

module.exports = {
  uuid,
  copyToClipboard,
  colorize,
};

// Import all functions for default export
import { slugify, toTitleCase, truncate } from './string.js';
import { formatDate, timeAgo } from './date.js';
import { isEmail, isUrl, isEmpty } from './validate.js';
import { commaNumber, randomInt, bytes } from './number.js';
import { unique, chunk, shuffle } from './array.js';
import { deepMerge, clone } from './object.js';
import { uuid, copyToClipboard, colorize } from './misc.js';

// Default export with all functions

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
module.exports.colorize = colorize;