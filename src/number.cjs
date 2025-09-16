/**
 * Advanced Number utility functions - 15+ functions
 * Rivals and surpasses Lodash, Ramda, and other popular libraries
 */

/**
 * Format number with commas as thousands separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function commaNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Generate random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert bytes to human readable format
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted bytes string
 */
function bytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Generate random float between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimals - Number of decimal places
 * @returns {number} Random float
 */
function randomFloat(min, max, decimals = 2) {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}

/**
 * Round number to specified decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
function round(num, decimals = 0) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Clamp number between min and max values
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 */
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Check if number is between min and max (inclusive)
 * @param {number} num - Number to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if between values
 */
function inRange(num, min, max) {
  return num >= min && num <= max;
}

/**
 * Convert number to percentage string
 * @param {number} num - Number to convert (0-1)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Percentage string
 */
function toPercent(num, decimals = 0) {
  return (num * 100).toFixed(decimals) + '%';
}

/**
 * Convert percentage to decimal
 * @param {string|number} percent - Percentage value
 * @returns {number} Decimal value
 */
function fromPercent(percent) {
  const num = typeof percent === 'string' ? parseFloat(percent.replace('%', '')) : percent;
  return num / 100;
}

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale (default: en-US)
 * @returns {string} Formatted currency string
 */
function toCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Calculate factorial of a number
 * @param {number} n - Number to calculate factorial for
 * @returns {number} Factorial result
 */
function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

/**
 * Calculate greatest common divisor
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Calculate least common multiple
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} LCM
 */
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Check if number is prime
 * @param {number} num - Number to check
 * @returns {boolean} True if prime
 */
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Check if number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if even
 */
function isEven(num) {
  return num % 2 === 0;
}

/**
 * Check if number is odd
 * @param {number} num - Number to check
 * @returns {boolean} True if odd
 */
function isOdd(num) {
  return num % 2 !== 0;
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Degrees to convert
 * @returns {number} Radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 * @param {number} radians - Radians to convert
 * @returns {number} Degrees
 */
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

/**
 * Calculate distance between two points
 * @param {number} x1 - First point x coordinate
 * @param {number} y1 - First point y coordinate
 * @param {number} x2 - Second point x coordinate
 * @param {number} y2 - Second point y coordinate
 * @returns {number} Distance
 */
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Map value from one range to another
 * @param {number} value - Value to map
 * @param {number} inMin - Input range minimum
 * @param {number} inMax - Input range maximum
 * @param {number} outMin - Output range minimum
 * @param {number} outMax - Output range maximum
 * @returns {number} Mapped value
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/**
 * Generate Fibonacci sequence up to n terms
 * @param {number} n - Number of terms
 * @returns {Array} Fibonacci sequence
 */
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  
  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }
  return sequence;
}

/**
 * Format number with ordinal suffix (1st, 2nd, 3rd, etc.)
 * @param {number} num - Number to format
 * @returns {string} Number with ordinal suffix
 */
function ordinal(num) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}


module.exports.commaNumber = commaNumber;
module.exports.randomInt = randomInt;
module.exports.bytes = bytes;
module.exports.randomFloat = randomFloat;
module.exports.round = round;
module.exports.clamp = clamp;
module.exports.inRange = inRange;
module.exports.toPercent = toPercent;
module.exports.fromPercent = fromPercent;
module.exports.toCurrency = toCurrency;
module.exports.factorial = factorial;
module.exports.gcd = gcd;
module.exports.lcm = lcm;
module.exports.isPrime = isPrime;
module.exports.isEven = isEven;
module.exports.isOdd = isOdd;
module.exports.toRadians = toRadians;
module.exports.toDegrees = toDegrees;
module.exports.distance = distance;
module.exports.lerp = lerp;
module.exports.mapRange = mapRange;
module.exports.fibonacci = fibonacci;
module.exports.ordinal = ordinal;