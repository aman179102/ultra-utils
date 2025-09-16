/**
 * Crypto/Hash utility functions - 8+ functions
 * Cryptographic operations and hashing utilities
 */

const { createHash, createHmac, randomBytes, pbkdf2Sync  } = require('crypto');

/**
 * Generate MD5 hash
 * @param {string} data - Data to hash
 * @returns {string} MD5 hash
 */
function md5(data) {
  return createHash('md5').update(data).digest('hex');
}

/**
 * Generate SHA1 hash
 * @param {string} data - Data to hash
 * @returns {string} SHA1 hash
 */
function sha1(data) {
  return createHash('sha1').update(data).digest('hex');
}

/**
 * Generate SHA256 hash
 * @param {string} data - Data to hash
 * @returns {string} SHA256 hash
 */
function sha256(data) {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Generate SHA512 hash
 * @param {string} data - Data to hash
 * @returns {string} SHA512 hash
 */
function sha512(data) {
  return createHash('sha512').update(data).digest('hex');
}

/**
 * Generate HMAC with SHA256
 * @param {string} data - Data to hash
 * @param {string} key - Secret key
 * @returns {string} HMAC-SHA256
 */
function hmacSha256(data, key) {
  return createHmac('sha256', key).update(data).digest('hex');
}

/**
 * Generate HMAC with SHA512
 * @param {string} data - Data to hash
 * @param {string} key - Secret key
 * @returns {string} HMAC-SHA512
 */
function hmacSha512(data, key) {
  return createHmac('sha512', key).update(data).digest('hex');
}

/**
 * Generate cryptographically secure random bytes
 * @param {number} size - Number of bytes
 * @param {string} encoding - Output encoding (hex, base64, etc.)
 * @returns {string} Random bytes
 */
function randomHex(size = 16, encoding = 'hex') {
  return randomBytes(size).toString(encoding);
}

/**
 * Generate secure random token
 * @param {number} length - Token length
 * @returns {string} Random token
 */
function randomToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = randomBytes(length);
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  
  return result;
}

/**
 * Hash password with PBKDF2
 * @param {string} password - Password to hash
 * @param {string} salt - Salt (optional, will generate if not provided)
 * @param {number} iterations - Number of iterations
 * @param {number} keylen - Key length
 * @returns {Object} Hash result with salt and hash
 */
function hashPassword(password, salt = null, iterations = 100000, keylen = 64) {
  const actualSalt = salt || randomBytes(32).toString('hex');
  const hash = pbkdf2Sync(password, actualSalt, iterations, keylen, 'sha512').toString('hex');
  
  return {
    salt: actualSalt,
    hash: hash,
    iterations: iterations,
    keylen: keylen
  };
}

/**
 * Verify password against hash
 * @param {string} password - Password to verify
 * @param {string} salt - Salt used in hashing
 * @param {string} hash - Original hash
 * @param {number} iterations - Number of iterations used
 * @param {number} keylen - Key length used
 * @returns {boolean} True if password matches
 */
function verifyPassword(password, salt, hash, iterations = 100000, keylen = 64) {
  const testHash = pbkdf2Sync(password, salt, iterations, keylen, 'sha512').toString('hex');
  return testHash === hash;
}

/**
 * Simple XOR cipher (for educational purposes only)
 * @param {string} text - Text to encrypt/decrypt
 * @param {string} key - Encryption key
 * @returns {string} Encrypted/decrypted text
 */
function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

/**
 * Generate hash with custom algorithm
 * @param {string} data - Data to hash
 * @param {string} algorithm - Hash algorithm (md5, sha1, sha256, sha512, etc.)
 * @param {string} encoding - Output encoding
 * @returns {string} Hash
 */
function hash(data, algorithm = 'sha256', encoding = 'hex') {
  return createHash(algorithm).update(data).digest(encoding);
}

/**
 * Generate HMAC with custom algorithm
 * @param {string} data - Data to hash
 * @param {string} key - Secret key
 * @param {string} algorithm - Hash algorithm
 * @param {string} encoding - Output encoding
 * @returns {string} HMAC
 */
function hmac(data, key, algorithm = 'sha256', encoding = 'hex') {
  return createHmac(algorithm, key).update(data).digest(encoding);
}


module.exports.md5 = md5;
module.exports.sha1 = sha1;
module.exports.sha256 = sha256;
module.exports.sha512 = sha512;
module.exports.hmacSha256 = hmacSha256;
module.exports.hmacSha512 = hmacSha512;
module.exports.randomHex = randomHex;
module.exports.randomToken = randomToken;
module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
module.exports.xorCipher = xorCipher;
module.exports.hash = hash;
module.exports.hmac = hmac;