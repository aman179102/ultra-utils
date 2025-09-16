/**
 * Object utility functions
 */

/**
 * Deep merge two or more objects
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 */
export function deepMerge(...objects) {
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
export function clone(obj) {
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
