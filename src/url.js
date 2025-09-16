/**
 * URL/Web utility functions - 8+ functions
 * URL parsing, manipulation, and web-related utilities
 */

/**
 * Parse URL into components
 * @param {string} url - URL to parse
 * @returns {Object} URL components
 */
export function parseUrl(url) {
  try {
    const parsed = new URL(url);
    return {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      origin: parsed.origin,
      host: parsed.host
    };
  } catch (error) {
    return null;
  }
}

/**
 * Build URL from components
 * @param {Object} components - URL components
 * @returns {string} Built URL
 */
export function buildUrl(components) {
  const { protocol = 'https:', hostname, port, pathname = '', search = '', hash = '' } = components;
  
  let url = `${protocol}//${hostname}`;
  if (port) url += `:${port}`;
  url += pathname;
  if (search) url += search.startsWith('?') ? search : `?${search}`;
  if (hash) url += hash.startsWith('#') ? hash : `#${hash}`;
  
  return url;
}

/**
 * Get query parameters from URL
 * @param {string} url - URL or query string
 * @returns {Object} Query parameters object
 */
export function getQueryParams(url) {
  const queryString = url.includes('?') ? url.split('?')[1] : url;
  const params = {};
  
  if (queryString) {
    const pairs = queryString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    }
  }
  
  return params;
}

/**
 * Build query string from object
 * @param {Object} params - Parameters object
 * @returns {string} Query string
 */
export function buildQueryString(params) {
  const pairs = [];
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  
  return pairs.join('&');
}

/**
 * Add query parameters to URL
 * @param {string} url - Base URL
 * @param {Object} params - Parameters to add
 * @returns {string} URL with added parameters
 */
export function addQueryParams(url, params) {
  const queryString = buildQueryString(params);
  if (!queryString) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${queryString}`;
}

/**
 * Remove query parameters from URL
 * @param {string} url - URL to clean
 * @param {Array} paramsToRemove - Parameter names to remove (optional)
 * @returns {string} Clean URL
 */
export function removeQueryParams(url, paramsToRemove = null) {
  const [baseUrl, queryString] = url.split('?');
  
  if (!queryString) return baseUrl;
  if (!paramsToRemove) return baseUrl;
  
  const params = getQueryParams(queryString);
  
  for (const param of paramsToRemove) {
    delete params[param];
  }
  
  const newQueryString = buildQueryString(params);
  return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
}

/**
 * Check if URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get domain from URL
 * @param {string} url - URL
 * @returns {string} Domain name
 */
export function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/**
 * Get subdomain from URL
 * @param {string} url - URL
 * @returns {string} Subdomain or null
 */
export function getSubdomain(url) {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.');
    
    if (parts.length > 2) {
      return parts.slice(0, -2).join('.');
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Get root domain from URL
 * @param {string} url - URL
 * @returns {string} Root domain
 */
export function getRootDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.');
    
    if (parts.length >= 2) {
      return parts.slice(-2).join('.');
    }
    
    return hostname;
  } catch {
    return null;
  }
}

/**
 * Normalize URL (remove trailing slash, convert to lowercase, etc.)
 * @param {string} url - URL to normalize
 * @returns {string} Normalized URL
 */
export function normalizeUrl(url) {
  try {
    const parsed = new URL(url.toLowerCase());
    
    // Remove trailing slash from pathname (except for root)
    if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }
    
    // Sort query parameters
    const params = new URLSearchParams(parsed.search);
    params.sort();
    parsed.search = params.toString();
    
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Join URL paths
 * @param {...string} paths - Path segments to join
 * @returns {string} Joined path
 */
export function joinPaths(...paths) {
  return paths
    .map((path, index) => {
      if (index === 0) {
        return path.replace(/\/+$/, '');
      }
      return path.replace(/^\/+|\/+$/g, '');
    })
    .filter(path => path.length > 0)
    .join('/');
}

/**
 * Encode URL component safely
 * @param {string} str - String to encode
 * @returns {string} Encoded string
 */
export function encodeUrl(str) {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

/**
 * Decode URL component safely
 * @param {string} str - String to decode
 * @returns {string} Decoded string
 */
export function decodeUrl(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

/**
 * Extract all URLs from text
 * @param {string} text - Text to search
 * @returns {Array} Array of found URLs
 */
export function extractUrls(text) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  return text.match(urlRegex) || [];
}
