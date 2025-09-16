/**
 * Array utility functions
 */

/**
 * Remove duplicate values from array
 * @param {Array} arr - Array to process
 * @returns {Array} Array with unique values
 */
export function unique(arr) {
  return [...new Set(arr)];
}

/**
 * Split array into chunks of specified size
 * @param {Array} arr - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array} Array of chunks
 */
export function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffle array elements randomly
 * @param {Array} arr - Array to shuffle
 * @returns {Array} Shuffled array (new array, original unchanged)
 */
export function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
