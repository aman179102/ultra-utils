/**
 * Advanced String utility functions - 30+ functions
 * Rivals and surpasses Lodash, Ramda, and other popular libraries
 */

/**
 * Convert string to URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} Slugified string
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Convert string to title case
 * @param {string} text - Text to convert
 * @returns {string} Title cased string
 */
function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate string to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 */
function truncate(text, length, suffix = '...') {
  if (text.length <= length) return text;
  return text.slice(0, length - suffix.length) + suffix;
}

/**
 * Convert string to camelCase
 * @param {string} text - Text to convert
 * @returns {string} camelCase string
 */
function camelCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '');
}

/**
 * Convert string to PascalCase
 * @param {string} text - Text to convert
 * @returns {string} PascalCase string
 */
function pascalCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '');
}

/**
 * Convert string to snake_case
 * @param {string} text - Text to convert
 * @returns {string} snake_case string
 */
function snakeCase(text) {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
}

/**
 * Convert string to kebab-case
 * @param {string} text - Text to convert
 * @returns {string} kebab-case string
 */
function kebabCase(text) {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-');
}

/**
 * Capitalize first letter of string
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Reverse a string
 * @param {string} text - Text to reverse
 * @returns {string} Reversed string
 */
function reverse(text) {
  return text.split('').reverse().join('');
}

/**
 * Check if string is palindrome
 * @param {string} text - Text to check
 * @returns {boolean} True if palindrome
 */
function isPalindrome(text) {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Count words in string
 * @param {string} text - Text to count
 * @returns {number} Word count
 */
function wordCount(text) {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Extract words from string
 * @param {string} text - Text to extract from
 * @returns {Array} Array of words
 */
function words(text) {
  return text.match(/\b\w+\b/g) || [];
}

/**
 * Pad string to specified length
 * @param {string} text - Text to pad
 * @param {number} length - Target length
 * @param {string} chars - Characters to pad with
 * @returns {string} Padded string
 */
function pad(text, length, chars = ' ') {
  const padLength = length - text.length;
  if (padLength <= 0) return text;
  
  const leftPad = Math.floor(padLength / 2);
  const rightPad = padLength - leftPad;
  
  return chars.repeat(leftPad) + text + chars.repeat(rightPad);
}

/**
 * Pad string on the left
 * @param {string} text - Text to pad
 * @param {number} length - Target length
 * @param {string} chars - Characters to pad with
 * @returns {string} Left-padded string
 */
function padStart(text, length, chars = ' ') {
  return text.padStart(length, chars);
}

/**
 * Pad string on the right
 * @param {string} text - Text to pad
 * @param {number} length - Target length
 * @param {string} chars - Characters to pad with
 * @returns {string} Right-padded string
 */
function padEnd(text, length, chars = ' ') {
  return text.padEnd(length, chars);
}

/**
 * Repeat string n times
 * @param {string} text - Text to repeat
 * @param {number} count - Number of repetitions
 * @returns {string} Repeated string
 */
function repeat(text, count) {
  return text.repeat(count);
}

/**
 * Remove HTML tags from string
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Escape HTML characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, match => htmlEscapes[match]);
}

/**
 * Unescape HTML characters
 * @param {string} html - HTML to unescape
 * @returns {string} Unescaped text
 */
function unescapeHtml(html) {
  const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };
  return html.replace(/&(?:amp|lt|gt|quot|#39);/g, match => htmlUnescapes[match]);
}

/**
 * Convert string to base64
 * @param {string} text - Text to encode
 * @returns {string} Base64 encoded string
 */
function toBase64(text) {
  if (typeof btoa !== 'undefined') {
    return btoa(text);
  }
  // Node.js fallback
  return Buffer.from(text, 'utf8').toString('base64');
}

/**
 * Decode base64 string
 * @param {string} base64 - Base64 string to decode
 * @returns {string} Decoded string
 */
function fromBase64(base64) {
  if (typeof atob !== 'undefined') {
    return atob(base64);
  }
  // Node.js fallback
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Generate random string
 * @param {number} length - Length of string
 * @param {string} chars - Characters to use
 * @returns {string} Random string
 */
function randomString(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Check if string starts with substring (case insensitive)
 * @param {string} text - Text to check
 * @param {string} searchString - String to search for
 * @returns {boolean} True if starts with
 */
function startsWithIgnoreCase(text, searchString) {
  return text.toLowerCase().startsWith(searchString.toLowerCase());
}

/**
 * Check if string ends with substring (case insensitive)
 * @param {string} text - Text to check
 * @param {string} searchString - String to search for
 * @returns {boolean} True if ends with
 */
function endsWithIgnoreCase(text, searchString) {
  return text.toLowerCase().endsWith(searchString.toLowerCase());
}

/**
 * Check if string contains substring (case insensitive)
 * @param {string} text - Text to check
 * @param {string} searchString - String to search for
 * @returns {boolean} True if contains
 */
function includesIgnoreCase(text, searchString) {
  return text.toLowerCase().includes(searchString.toLowerCase());
}

/**
 * Replace all occurrences of substring
 * @param {string} text - Text to process
 * @param {string} search - String to search for
 * @param {string} replace - String to replace with
 * @returns {string} Processed string
 */
function replaceAll(text, search, replace) {
  return text.split(search).join(replace);
}

/**
 * Insert substring at specified position
 * @param {string} text - Original text
 * @param {number} index - Position to insert at
 * @param {string} substring - String to insert
 * @returns {string} Modified string
 */
function insert(text, index, substring) {
  return text.slice(0, index) + substring + text.slice(index);
}

/**
 * Remove substring from string
 * @param {string} text - Original text
 * @param {string} substring - String to remove
 * @returns {string} Modified string
 */
function remove(text, substring) {
  return text.replace(new RegExp(substring, 'g'), '');
}

/**
 * Count occurrences of substring
 * @param {string} text - Text to search in
 * @param {string} substring - String to count
 * @returns {number} Number of occurrences
 */
function countOccurrences(text, substring) {
  return (text.match(new RegExp(substring, 'g')) || []).length;
}

/**
 * Get Levenshtein distance between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Edit distance
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Calculate string similarity (0-1)
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Similarity score
 */
function similarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}


module.exports.slugify = slugify;
module.exports.toTitleCase = toTitleCase;
module.exports.truncate = truncate;
module.exports.camelCase = camelCase;
module.exports.pascalCase = pascalCase;
module.exports.snakeCase = snakeCase;
module.exports.kebabCase = kebabCase;
module.exports.capitalize = capitalize;
module.exports.reverse = reverse;
module.exports.isPalindrome = isPalindrome;
module.exports.wordCount = wordCount;
module.exports.words = words;
module.exports.pad = pad;
module.exports.padStart = padStart;
module.exports.padEnd = padEnd;
module.exports.repeat = repeat;
module.exports.stripHtml = stripHtml;
module.exports.escapeHtml = escapeHtml;
module.exports.unescapeHtml = unescapeHtml;
module.exports.toBase64 = toBase64;
module.exports.fromBase64 = fromBase64;
module.exports.randomString = randomString;
module.exports.startsWithIgnoreCase = startsWithIgnoreCase;
module.exports.endsWithIgnoreCase = endsWithIgnoreCase;
module.exports.includesIgnoreCase = includesIgnoreCase;
module.exports.replaceAll = replaceAll;
module.exports.insert = insert;
module.exports.remove = remove;
module.exports.countOccurrences = countOccurrences;
module.exports.levenshteinDistance = levenshteinDistance;
module.exports.similarity = similarity;