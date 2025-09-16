#!/usr/bin/env node

import utils from '../src/index.js';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Function categories for organized help
const categories = {
  string: {
    name: '📝 String Utilities',
    functions: [
      'slugify', 'toTitleCase', 'truncate', 'camelCase', 'pascalCase', 'snakeCase', 'kebabCase',
      'capitalize', 'reverse', 'isPalindrome', 'wordCount', 'padStart', 'padEnd', 'repeat',
      'escapeHtml', 'unescapeHtml', 'base64Encode', 'base64Decode', 'randomString', 'similarity',
      'levenshteinDistance', 'removeAccents', 'extractNumbers', 'extractEmails', 'mask',
      'swapCase', 'isAnagram', 'longestCommonSubstring', 'compress', 'decompress'
    ]
  },
  date: {
    name: '📅 Date & Time Utilities',
    functions: [
      'formatDate', 'timeAgo', 'addDays', 'addMonths', 'addYears', 'subtractDays', 'subtractMonths',
      'subtractYears', 'diffInDays', 'diffInMonths', 'diffInYears', 'isToday', 'isYesterday',
      'isTomorrow', 'isLeapYear', 'startOfDay', 'endOfDay', 'startOfWeek', 'endOfWeek',
      'startOfMonth', 'endOfMonth', 'startOfYear', 'endOfYear', 'daysInMonth', 'dayOfYear',
      'weekOfYear'
    ]
  },
  array: {
    name: '📊 Array Utilities',
    functions: [
      'unique', 'chunk', 'shuffle', 'flatten', 'flattenDeep', 'intersection', 'difference',
      'union', 'compact', 'take', 'takeLast', 'drop', 'dropLast', 'zip', 'groupBy',
      'countBy', 'partition', 'findIndex', 'findLastIndex', 'sample', 'sampleSize',
      'sortBy', 'fill', 'range', 'transpose', 'max', 'min', 'sum', 'mean', 'median'
    ]
  },
  object: {
    name: '🏗️ Object Utilities',
    functions: [
      'deepMerge', 'clone', 'get', 'set', 'has', 'omit', 'pick', 'keys', 'values',
      'flatten', 'unflatten', 'invert', 'mapValues', 'mapKeys', 'isEqual', 'isEmpty',
      'size', 'fromPairs', 'toPairs'
    ]
  },
  number: {
    name: '🔢 Number & Math Utilities',
    functions: [
      'commaNumber', 'randomInt', 'bytes', 'randomFloat', 'round', 'ceil', 'floor',
      'clamp', 'inRange', 'toPercent', 'fromPercent', 'toCurrency', 'factorial',
      'gcd', 'lcm', 'isPrime', 'isEven', 'isOdd', 'toRadians', 'toDegrees', 'distance',
      'lerp', 'mapRange', 'fibonacci', 'toOrdinal'
    ]
  },
  crypto: {
    name: '🔐 Crypto & Hash Utilities',
    functions: [
      'md5', 'sha1', 'sha256', 'sha512', 'hmacSha256', 'hmacSha512', 'randomHex',
      'randomToken', 'hashPassword', 'verifyPassword', 'xorCipher', 'hash', 'hmac'
    ]
  },
  color: {
    name: '🎨 Color Utilities',
    functions: [
      'hexToRgb', 'rgbToHex', 'rgbToHsl', 'hslToRgb', 'randomColor', 'lighten',
      'darken', 'saturate', 'desaturate', 'complement', 'generatePalette', 'contrastRatio',
      'isLight', 'isDark', 'mix'
    ]
  },
  url: {
    name: '🌐 URL & Web Utilities',
    functions: [
      'parseUrl', 'buildUrl', 'getQueryParams', 'buildQueryString', 'addQueryParams',
      'removeQueryParams', 'isValidUrl', 'getDomain', 'getSubdomain', 'getRootDomain',
      'normalizeUrl', 'joinPaths', 'encodeUrl', 'decodeUrl', 'extractUrls'
    ]
  },
  fs: {
    name: '📁 File System Utilities',
    functions: [
      'exists', 'readFile', 'writeFile', 'readJson', 'writeJson', 'getStats',
      'getFileSize', 'listDir', 'createDir', 'deleteFile', 'copyFile', 'getExtension',
      'getBasename', 'getDirname', 'resolvePath', 'joinPath', 'findFiles'
    ]
  },
  validate: {
    name: '✅ Validation Utilities',
    functions: ['isEmail', 'isUrl', 'isEmpty']
  },
  misc: {
    name: '🔧 Miscellaneous Utilities',
    functions: ['uuid', 'copyToClipboard', 'colorize']
  }
};

function colorize(text, color) {
  return `${colors[color] || ''}${text}${colors.reset}`;
}

function showHelp() {
  console.log(colorize('\n🚀 Ultra Utils CLI - 100+ Utility Functions', 'cyan'));
  console.log(colorize('═'.repeat(50), 'blue'));
  
  console.log(colorize('\nUsage:', 'yellow'));
  console.log('  npx ultra-utils <function> [arguments...]');
  console.log('  npx ultra-utils help [category]');
  console.log('  npx ultra-utils list');
  
  console.log(colorize('\nExamples:', 'yellow'));
  console.log('  npx ultra-utils slugify "Hello World"');
  console.log('  npx ultra-utils camelCase "hello-world"');
  console.log('  npx ultra-utils randomColor');
  console.log('  npx ultra-utils sha256 "password"');
  console.log('  npx ultra-utils help string');
  
  console.log(colorize('\nCategories:', 'yellow'));
  Object.entries(categories).forEach(([key, category]) => {
    console.log(`  ${colorize(key.padEnd(10), 'green')} ${category.name} (${category.functions.length} functions)`);
  });
  
  console.log(colorize('\nFor detailed help on a category:', 'yellow'));
  console.log('  npx ultra-utils help <category>');
  console.log();
}

function showCategoryHelp(categoryName) {
  const category = categories[categoryName];
  if (!category) {
    console.log(colorize(`❌ Unknown category: ${categoryName}`, 'red'));
    console.log(colorize('Available categories:', 'yellow'));
    Object.keys(categories).forEach(key => {
      console.log(`  ${colorize(key, 'green')}`);
    });
    return;
  }
  
  console.log(colorize(`\n${category.name}`, 'cyan'));
  console.log(colorize('═'.repeat(category.name.length), 'blue'));
  
  category.functions.forEach(func => {
    console.log(`  ${colorize(func, 'green')}`);
  });
  
  console.log(colorize(`\nTotal: ${category.functions.length} functions`, 'yellow'));
  console.log(colorize('\nUsage example:', 'yellow'));
  console.log(`  npx ultra-utils ${category.functions[0]} [arguments...]`);
  console.log();
}

function listAllFunctions() {
  console.log(colorize('\n📋 All Available Functions', 'cyan'));
  console.log(colorize('═'.repeat(30), 'blue'));
  
  let totalFunctions = 0;
  Object.entries(categories).forEach(([key, category]) => {
    console.log(colorize(`\n${category.name}`, 'magenta'));
    console.log(colorize('-'.repeat(category.name.length), 'blue'));
    
    const chunks = [];
    for (let i = 0; i < category.functions.length; i += 3) {
      chunks.push(category.functions.slice(i, i + 3));
    }
    
    chunks.forEach(chunk => {
      const line = chunk.map(func => colorize(func.padEnd(20), 'green')).join(' ');
      console.log(`  ${line}`);
    });
    
    totalFunctions += category.functions.length;
  });
  
  console.log(colorize(`\n🎉 Total: ${totalFunctions} utility functions available!`, 'cyan'));
  console.log();
}

function executeFunction(functionName, args) {
  if (!utils[functionName]) {
    console.log(colorize(`❌ Function '${functionName}' not found`, 'red'));
    
    // Suggest similar functions
    const allFunctions = Object.values(categories).flatMap(cat => cat.functions);
    const suggestions = allFunctions.filter(func => 
      func.toLowerCase().includes(functionName.toLowerCase()) ||
      functionName.toLowerCase().includes(func.toLowerCase())
    );
    
    if (suggestions.length > 0) {
      console.log(colorize('\n💡 Did you mean:', 'yellow'));
      suggestions.slice(0, 5).forEach(suggestion => {
        console.log(`  ${colorize(suggestion, 'green')}`);
      });
    }
    
    console.log(colorize('\nUse "npx ultra-utils list" to see all available functions', 'cyan'));
    return;
  }
  
  try {
    // Parse arguments
    const parsedArgs = args.map(arg => {
      // Try to parse as JSON first
      try {
        return JSON.parse(arg);
      } catch {
        // If not JSON, check if it's a number
        if (!isNaN(arg) && !isNaN(parseFloat(arg))) {
          return parseFloat(arg);
        }
        // Otherwise return as string
        return arg;
      }
    });
    
    const result = utils[functionName](...parsedArgs);
    
    console.log(colorize(`\n✨ Result for ${functionName}(${args.join(', ')}):\n`, 'cyan'));
    
    if (typeof result === 'object') {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(result);
    }
    
    console.log();
  } catch (error) {
    console.log(colorize(`❌ Error executing ${functionName}:`, 'red'));
    console.log(colorize(error.message, 'red'));
    
    // Show function signature help
    const category = Object.values(categories).find(cat => 
      cat.functions.includes(functionName)
    );
    
    if (category) {
      console.log(colorize(`\n💡 This function is in the ${category.name} category`, 'yellow'));
      console.log(colorize(`Use "npx ultra-utils help ${Object.keys(categories).find(key => categories[key] === category)}" for more info`, 'cyan'));
    }
  }
}

// Main CLI logic
const args = process.argv.slice(2);

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'help') {
  if (args[1]) {
    showCategoryHelp(args[1]);
  } else {
    showHelp();
  }
} else if (args[0] === 'list') {
  listAllFunctions();
} else {
  const functionName = args[0];
  const functionArgs = args.slice(1);
  executeFunction(functionName, functionArgs);
}
