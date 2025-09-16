/**
 * File System utility functions - 10+ functions
 * Node.js file system operations made simple
 */

import { readFileSync, writeFileSync, existsSync, statSync, readdirSync, mkdirSync, unlinkSync, copyFileSync } from 'fs';
import { join, extname, basename, dirname, resolve } from 'path';

/**
 * Check if file or directory exists
 * @param {string} path - Path to check
 * @returns {boolean} True if exists
 */
export function exists(path) {
  try {
    return existsSync(path);
  } catch {
    return false;
  }
}

/**
 * Read file content as string
 * @param {string} filePath - Path to file
 * @param {string} encoding - File encoding (default: utf8)
 * @returns {string|null} File content or null if error
 */
export function readFile(filePath, encoding = 'utf8') {
  try {
    return readFileSync(filePath, encoding);
  } catch {
    return null;
  }
}

/**
 * Write content to file
 * @param {string} filePath - Path to file
 * @param {string} content - Content to write
 * @param {string} encoding - File encoding (default: utf8)
 * @returns {boolean} True if successful
 */
export function writeFile(filePath, content, encoding = 'utf8') {
  try {
    writeFileSync(filePath, content, encoding);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read JSON file and parse
 * @param {string} filePath - Path to JSON file
 * @returns {Object|null} Parsed JSON or null if error
 */
export function readJson(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Write object to JSON file
 * @param {string} filePath - Path to JSON file
 * @param {Object} data - Data to write
 * @param {number} spaces - JSON formatting spaces
 * @returns {boolean} True if successful
 */
export function writeJson(filePath, data, spaces = 2) {
  try {
    const content = JSON.stringify(data, null, spaces);
    writeFileSync(filePath, content, 'utf8');
    return true;
  } catch {
    return false;
  }
}

/**
 * Get file stats
 * @param {string} filePath - Path to file
 * @returns {Object|null} File stats or null if error
 */
export function getStats(filePath) {
  try {
    const stats = statSync(filePath);
    return {
      size: stats.size,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      created: stats.birthtime,
      modified: stats.mtime,
      accessed: stats.atime
    };
  } catch {
    return null;
  }
}

/**
 * Get file size in bytes
 * @param {string} filePath - Path to file
 * @returns {number|null} File size or null if error
 */
export function getFileSize(filePath) {
  try {
    return statSync(filePath).size;
  } catch {
    return null;
  }
}

/**
 * List directory contents
 * @param {string} dirPath - Path to directory
 * @param {boolean} recursive - Include subdirectories
 * @returns {Array} Array of file/directory names
 */
export function listDir(dirPath, recursive = false) {
  try {
    const items = readdirSync(dirPath);
    if (!recursive) return items;
    
    const result = [];
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stats = statSync(fullPath);
      
      if (stats.isDirectory()) {
        const subItems = listDir(fullPath, true);
        result.push(...subItems.map(sub => join(item, sub)));
      } else {
        result.push(item);
      }
    }
    return result;
  } catch {
    return [];
  }
}

/**
 * Create directory (with parents if needed)
 * @param {string} dirPath - Path to create
 * @returns {boolean} True if successful
 */
export function createDir(dirPath) {
  try {
    mkdirSync(dirPath, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * Delete file
 * @param {string} filePath - Path to file
 * @returns {boolean} True if successful
 */
export function deleteFile(filePath) {
  try {
    unlinkSync(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Copy file
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 * @returns {boolean} True if successful
 */
export function copyFile(source, destination) {
  try {
    copyFileSync(source, destination);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get file extension
 * @param {string} filePath - Path to file
 * @returns {string} File extension (without dot)
 */
export function getExtension(filePath) {
  return extname(filePath).slice(1);
}

/**
 * Get filename without extension
 * @param {string} filePath - Path to file
 * @returns {string} Filename without extension
 */
export function getBasename(filePath) {
  return basename(filePath, extname(filePath));
}

/**
 * Get directory name from path
 * @param {string} filePath - Path to file
 * @returns {string} Directory name
 */
export function getDirname(filePath) {
  return dirname(filePath);
}

/**
 * Resolve absolute path
 * @param {string} path - Path to resolve
 * @returns {string} Absolute path
 */
export function resolvePath(path) {
  return resolve(path);
}

/**
 * Join path segments
 * @param {...string} segments - Path segments
 * @returns {string} Joined path
 */
export function joinPath(...segments) {
  return join(...segments);
}

/**
 * Find files by pattern
 * @param {string} dirPath - Directory to search
 * @param {RegExp|string} pattern - Search pattern
 * @param {boolean} recursive - Search recursively
 * @returns {Array} Array of matching file paths
 */
export function findFiles(dirPath, pattern, recursive = false) {
  try {
    const files = listDir(dirPath, recursive);
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    
    return files.filter(file => regex.test(file));
  } catch {
    return [];
  }
}
