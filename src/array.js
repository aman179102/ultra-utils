/**
 * Advanced Array utility functions - 20+ functions
 * Rivals and surpasses Lodash, Ramda, and other popular libraries
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

/**
 * Flatten array by one level
 * @param {Array} arr - Array to flatten
 * @returns {Array} Flattened array
 */
export function flatten(arr) {
  return arr.flat();
}

/**
 * Deep flatten array (all levels)
 * @param {Array} arr - Array to flatten
 * @returns {Array} Deep flattened array
 */
export function flattenDeep(arr) {
  return arr.flat(Infinity);
}

/**
 * Get intersection of two arrays
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} Intersection array
 */
export function intersection(arr1, arr2) {
  return arr1.filter(x => arr2.includes(x));
}

/**
 * Get difference between two arrays
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} Difference array
 */
export function difference(arr1, arr2) {
  return arr1.filter(x => !arr2.includes(x));
}

/**
 * Get union of two arrays (unique elements from both)
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} Union array
 */
export function union(arr1, arr2) {
  return unique([...arr1, ...arr2]);
}

/**
 * Remove falsy values from array
 * @param {Array} arr - Array to compact
 * @returns {Array} Compacted array
 */
export function compact(arr) {
  return arr.filter(Boolean);
}

/**
 * Get first n elements from array
 * @param {Array} arr - Source array
 * @param {number} n - Number of elements
 * @returns {Array} First n elements
 */
export function take(arr, n = 1) {
  return arr.slice(0, n);
}

/**
 * Get last n elements from array
 * @param {Array} arr - Source array
 * @param {number} n - Number of elements
 * @returns {Array} Last n elements
 */
export function takeLast(arr, n = 1) {
  return arr.slice(-n);
}

/**
 * Drop first n elements from array
 * @param {Array} arr - Source array
 * @param {number} n - Number of elements to drop
 * @returns {Array} Array without first n elements
 */
export function drop(arr, n = 1) {
  return arr.slice(n);
}

/**
 * Drop last n elements from array
 * @param {Array} arr - Source array
 * @param {number} n - Number of elements to drop
 * @returns {Array} Array without last n elements
 */
export function dropLast(arr, n = 1) {
  return arr.slice(0, -n);
}

/**
 * Zip multiple arrays together
 * @param {...Array} arrays - Arrays to zip
 * @returns {Array} Zipped array
 */
export function zip(...arrays) {
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  return Array.from({ length: maxLength }, (_, i) => 
    arrays.map(arr => arr[i])
  );
}

/**
 * Group array elements by a key function
 * @param {Array} arr - Array to group
 * @param {Function} keyFn - Function to generate keys
 * @returns {Object} Grouped object
 */
export function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
}

/**
 * Count occurrences of each element
 * @param {Array} arr - Array to count
 * @returns {Object} Count object
 */
export function countBy(arr) {
  return arr.reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});
}

/**
 * Partition array into two arrays based on predicate
 * @param {Array} arr - Array to partition
 * @param {Function} predicate - Test function
 * @returns {Array} Array with two arrays [truthy, falsy]
 */
export function partition(arr, predicate) {
  return arr.reduce(
    ([pass, fail], item) => 
      predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
    [[], []]
  );
}

/**
 * Find index of element using predicate
 * @param {Array} arr - Array to search
 * @param {Function} predicate - Test function
 * @returns {number} Index or -1 if not found
 */
export function findIndex(arr, predicate) {
  return arr.findIndex(predicate);
}

/**
 * Find last index of element using predicate
 * @param {Array} arr - Array to search
 * @param {Function} predicate - Test function
 * @returns {number} Index or -1 if not found
 */
export function findLastIndex(arr, predicate) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) return i;
  }
  return -1;
}

/**
 * Get random element from array
 * @param {Array} arr - Source array
 * @returns {*} Random element
 */
export function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get n random elements from array
 * @param {Array} arr - Source array
 * @param {number} n - Number of elements
 * @returns {Array} Random elements
 */
export function sampleSize(arr, n) {
  const shuffled = shuffle(arr);
  return shuffled.slice(0, n);
}

/**
 * Sort array by multiple criteria
 * @param {Array} arr - Array to sort
 * @param {Array} iteratees - Sort functions or property names
 * @returns {Array} Sorted array
 */
export function sortBy(arr, iteratees) {
  return [...arr].sort((a, b) => {
    for (const iteratee of iteratees) {
      const aVal = typeof iteratee === 'function' ? iteratee(a) : a[iteratee];
      const bVal = typeof iteratee === 'function' ? iteratee(b) : b[iteratee];
      
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
}

/**
 * Create array of specified length filled with value
 * @param {number} length - Array length
 * @param {*} value - Fill value
 * @returns {Array} Filled array
 */
export function fill(length, value) {
  return Array(length).fill(value);
}

/**
 * Create array of numbers in range
 * @param {number} start - Start number
 * @param {number} end - End number
 * @param {number} step - Step size
 * @returns {Array} Range array
 */
export function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Transpose 2D array (swap rows and columns)
 * @param {Array<Array>} matrix - 2D array
 * @returns {Array<Array>} Transposed array
 */
export function transpose(matrix) {
  return matrix[0].map((_, colIndex) => 
    matrix.map(row => row[colIndex])
  );
}

/**
 * Get maximum value from array
 * @param {Array} arr - Array of numbers
 * @returns {number} Maximum value
 */
export function max(arr) {
  return Math.max(...arr);
}

/**
 * Get minimum value from array
 * @param {Array} arr - Array of numbers
 * @returns {number} Minimum value
 */
export function min(arr) {
  return Math.min(...arr);
}

/**
 * Get sum of array values
 * @param {Array} arr - Array of numbers
 * @returns {number} Sum
 */
export function sum(arr) {
  return arr.reduce((total, num) => total + num, 0);
}

/**
 * Get average of array values
 * @param {Array} arr - Array of numbers
 * @returns {number} Average
 */
export function mean(arr) {
  return sum(arr) / arr.length;
}

/**
 * Get median of array values
 * @param {Array} arr - Array of numbers
 * @returns {number} Median
 */
export function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 
    ? (sorted[mid - 1] + sorted[mid]) / 2 
    : sorted[mid];
}
