/**
 * Miscellaneous utility functions
 */

/**
 * Generate a UUID v4
 * @returns {string} UUID string
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Copy text to clipboard (browser + node fallback)
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
  // Browser environment
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  
  // Node.js environment fallback
  if (typeof process !== 'undefined' && process.stdout) {
    console.log(`📋 Copy this: ${text}`);
    return true;
  }
  
  return false;
}

/**
 * Colorize text for CLI output
 * @param {string} text - Text to colorize
 * @param {string} color - Color name (red, green, blue, yellow, magenta, cyan, white)
 * @returns {string} Colorized text
 */
function colorize(text, color) {
  const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
  };
  
  const colorCode = colors[color] || colors.white;
  return `${colorCode}${text}${colors.reset}`;
}


module.exports.uuid = uuid;
module.exports.copyToClipboard = copyToClipboard;
module.exports.colorize = colorize;