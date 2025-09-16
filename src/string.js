/**
 * String utility functions
 */

/**
 * Convert string to URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} Slugified string
 */
export function slugify(text) {
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
export function toTitleCase(text) {
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
export function truncate(text, length, suffix = '...') {
  if (text.length <= length) return text;
  return text.slice(0, length - suffix.length) + suffix;
}
