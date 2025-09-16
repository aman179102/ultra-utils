/**
 * Advanced Object utility functions - 15+ functions
 * Rivals and surpasses Lodash, Ramda, and other popular libraries
 */

/**
 * Deep merge two or more objects
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 */
function deepMerge(...objects) {
  const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);
  
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    
    return prev;
  }, {});
}

/**
 * Deep clone an object
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
function clone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (Array.isArray(obj)) return obj.map(clone);
  
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = clone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Get value at object path
 * @param {Object} obj - Source object
 * @param {string} path - Dot notation path
 * @param {*} defaultValue - Default value if path not found
 * @returns {*} Value at path
 */
function get(obj, path, defaultValue) {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
}

/**
 * Set value at object path
 * @param {Object} obj - Target object
 * @param {string} path - Dot notation path
 * @param {*} value - Value to set
 * @returns {Object} Modified object
 */
function set(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return obj;
}

/**
 * Check if object has property at path
 * @param {Object} obj - Source object
 * @param {string} path - Dot notation path
 * @returns {boolean} True if path exists
 */
function has(obj, path) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current == null || typeof current !== 'object' || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}

/**
 * Omit properties from object
 * @param {Object} obj - Source object
 * @param {Array|string} keys - Keys to omit
 * @returns {Object} New object without omitted keys
 */
function omit(obj, keys) {
  const keysArray = Array.isArray(keys) ? keys : [keys];
  const result = {};
  
  for (const key in obj) {
    if (!keysArray.includes(key)) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

/**
 * Pick properties from object
 * @param {Object} obj - Source object
 * @param {Array|string} keys - Keys to pick
 * @returns {Object} New object with only picked keys
 */
function pick(obj, keys) {
  const keysArray = Array.isArray(keys) ? keys : [keys];
  const result = {};
  
  for (const key of keysArray) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

/**
 * Get all keys from object (including nested)
 * @param {Object} obj - Source object
 * @param {string} prefix - Prefix for nested keys
 * @returns {Array} Array of all keys
 */
function keys(obj, prefix = '') {
  let result = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    result.push(fullKey);
    
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result = result.concat(keys(obj[key], fullKey));
    }
  }
  
  return result;
}

/**
 * Get all values from object (including nested)
 * @param {Object} obj - Source object
 * @returns {Array} Array of all values
 */
function values(obj) {
  let result = [];
  
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result = result.concat(values(obj[key]));
    } else {
      result.push(obj[key]);
    }
  }
  
  return result;
}

/**
 * Flatten nested object to single level
 * @param {Object} obj - Object to flatten
 * @param {string} separator - Key separator
 * @returns {Object} Flattened object
 */
function flatten(obj, separator = '.') {
  const result = {};
  
  function recurse(current, prop) {
    if (Object(current) !== current) {
      result[prop] = current;
    } else if (Array.isArray(current)) {
      for (let i = 0; i < current.length; i++) {
        recurse(current[i], prop + separator + i);
      }
      if (current.length === 0) {
        result[prop] = [];
      }
    } else {
      let isEmpty = true;
      for (const p in current) {
        isEmpty = false;
        recurse(current[p], prop ? prop + separator + p : p);
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }
  
  recurse(obj, '');
  return result;
}

/**
 * Unflatten object from single level to nested
 * @param {Object} obj - Flattened object
 * @param {string} separator - Key separator
 * @returns {Object} Nested object
 */
function unflatten(obj, separator = '.') {
  const result = {};
  
  for (const key in obj) {
    const keys = key.split(separator);
    keys.reduce((acc, k, i) => {
      return acc[k] || (acc[k] = isNaN(Number(keys[i + 1])) ? {} : []);
    }, result);
    
    set(result, key.replace(/\./g, separator), obj[key]);
  }
  
  return result;
}

/**
 * Invert object keys and values
 * @param {Object} obj - Object to invert
 * @returns {Object} Inverted object
 */
function invert(obj) {
  const result = {};
  for (const key in obj) {
    result[obj[key]] = key;
  }
  return result;
}

/**
 * Transform object values
 * @param {Object} obj - Source object
 * @param {Function} transformer - Transform function
 * @returns {Object} Transformed object
 */
function mapValues(obj, transformer) {
  const result = {};
  for (const key in obj) {
    result[key] = transformer(obj[key], key, obj);
  }
  return result;
}

/**
 * Transform object keys
 * @param {Object} obj - Source object
 * @param {Function} transformer - Transform function
 * @returns {Object} Transformed object
 */
function mapKeys(obj, transformer) {
  const result = {};
  for (const key in obj) {
    const newKey = transformer(obj[key], key, obj);
    result[newKey] = obj[key];
  }
  return result;
}

/**
 * Check if two objects are deeply equal
 * @param {*} obj1 - First object
 * @param {*} obj2 - Second object
 * @returns {boolean} True if deeply equal
 */
function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return obj1 === obj2;
  
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object') return obj1 === obj2;
  
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
function isEmpty(obj) {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
}

/**
 * Get object size (number of properties)
 * @param {Object} obj - Object to measure
 * @returns {number} Number of properties
 */
function size(obj) {
  if (obj == null) return 0;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length;
  return Object.keys(obj).length;
}

/**
 * Create object from key-value pairs
 * @param {Array} pairs - Array of [key, value] pairs
 * @returns {Object} Created object
 */
function fromPairs(pairs) {
  const result = {};
  for (const [key, value] of pairs) {
    result[key] = value;
  }
  return result;
}

/**
 * Convert object to key-value pairs
 * @param {Object} obj - Object to convert
 * @returns {Array} Array of [key, value] pairs
 */
function toPairs(obj) {
  return Object.entries(obj);
}


module.exports.deepMerge = deepMerge;
module.exports.clone = clone;
module.exports.get = get;
module.exports.set = set;
module.exports.has = has;
module.exports.omit = omit;
module.exports.pick = pick;
module.exports.keys = keys;
module.exports.values = values;
module.exports.flatten = flatten;
module.exports.recurse = recurse;
module.exports.unflatten = unflatten;
module.exports.invert = invert;
module.exports.mapValues = mapValues;
module.exports.mapKeys = mapKeys;
module.exports.isEqual = isEqual;
module.exports.isEmpty = isEmpty;
module.exports.size = size;
module.exports.fromPairs = fromPairs;
module.exports.toPairs = toPairs;