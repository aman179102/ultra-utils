# 🚀 Ultra Utils

[![npm version](https://badge.fury.io/js/ultra-utils.svg)](https://badge.fury.io/js/ultra-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-green)](https://www.npmjs.com/package/ultra-utils)
[![Tree Shakable](https://img.shields.io/badge/tree--shakable-✓-brightgreen)](https://webpack.js.org/guides/tree-shaking/)

A **lightweight, zero-dependency** utility library with 15+ essential functions for modern JavaScript development. Supports both **ESM** and **CommonJS**, with built-in **CLI support** and **tree-shaking**.

## ✨ Features

- 🪶 **Lightweight** - Zero dependencies, minimal footprint
- 📦 **Modular** - Import only what you need (tree-shakable)
- 🔄 **Dual Support** - Works with both ESM and CommonJS
- 🖥️ **CLI Ready** - Use via `npx ultra-utils`
- 🎯 **TypeScript Ready** - JSDoc annotations for IntelliSense
- 🧪 **Well Tested** - Comprehensive test coverage
- 📱 **Universal** - Works in Node.js and browsers

## 📦 Installation

```bash
npm install ultra-utils
```

Or use directly with npx:
```bash
npx ultra-utils slugify "Hello World"
```

## 🚀 Quick Start

### ESM (Recommended)
```javascript
import { slugify, timeAgo, randomInt } from 'ultra-utils';

slugify('Hello World!');        // → 'hello-world'
timeAgo('2025-09-10');          // → '6 days ago'
randomInt(1, 100);              // → 42 (random)
```

### CommonJS
```javascript
const { slugify, timeAgo, randomInt } = require('ultra-utils');

slugify('Hello World!');        // → 'hello-world'
timeAgo('2025-09-10');          // → '6 days ago'
randomInt(1, 100);              // → 42 (random)
```

### Import Specific Modules
```javascript
import { slugify } from 'ultra-utils/string';
import { timeAgo } from 'ultra-utils/date';
import { isEmail } from 'ultra-utils/validate';
```

## 📚 API Reference

### 🔤 String Utils

#### `slugify(text)`
Convert string to URL-friendly slug.
```javascript
slugify('Hello World!');           // → 'hello-world'
slugify('My Blog Post Title');     // → 'my-blog-post-title'
```

#### `toTitleCase(text)`
Convert string to title case.
```javascript
toTitleCase('hello world');        // → 'Hello World'
toTitleCase('the quick brown fox'); // → 'The Quick Brown Fox'
```

#### `truncate(text, length, suffix?)`
Truncate string to specified length.
```javascript
truncate('Long text here', 10);           // → 'Long te...'
truncate('Short', 10);                    // → 'Short'
truncate('Custom suffix', 8, '→');        // → 'Custom→'
```

### 📅 Date Utils

#### `formatDate(date, format?)`
Format date to specified format.
```javascript
formatDate('2025-09-16');                 // → '2025-09-16'
formatDate(new Date(), 'DD/MM/YYYY');     // → '16/09/2025'
formatDate(new Date(), 'YYYY-MM-DD HH:mm'); // → '2025-09-16 14:30'
```

#### `timeAgo(date)`
Get human-readable time ago string.
```javascript
timeAgo('2025-09-10');                     // → '6 days ago'
timeAgo('2025-09-16T10:00:00');           // → '4 hours ago'
timeAgo(new Date(Date.now() - 60000));     // → '1 minute ago'
```

### ✅ Validation Utils

#### `isEmail(email)`
Check if string is a valid email.
```javascript
isEmail('test@example.com');               // → true
isEmail('invalid-email');                  // → false
```

#### `isUrl(url)`
Check if string is a valid URL.
```javascript
isUrl('https://example.com');              // → true
isUrl('not-a-url');                        // → false
```

#### `isEmpty(value)`
Check if value is empty.
```javascript
isEmpty('');                               // → true
isEmpty([]);                               // → true
isEmpty({});                               // → true
isEmpty(null);                             // → true
isEmpty('hello');                          // → false
```

### 🔢 Number Utils

#### `commaNumber(num)`
Format number with comma separators.
```javascript
commaNumber(1234567);                      // → '1,234,567'
commaNumber(1000);                         // → '1,000'
```

#### `randomInt(min, max)`
Generate random integer between min and max.
```javascript
randomInt(1, 10);                          // → 7 (random 1-10)
randomInt(100, 200);                       // → 156 (random 100-200)
```

#### `bytes(bytes, decimals?)`
Convert bytes to human readable format.
```javascript
bytes(1024);                               // → '1 KB'
bytes(1048576);                            // → '1 MB'
bytes(1234567, 1);                         // → '1.2 MB'
```

### 📋 Array Utils

#### `unique(arr)`
Remove duplicate values from array.
```javascript
unique([1, 2, 2, 3, 3, 4]);               // → [1, 2, 3, 4]
unique(['a', 'b', 'a', 'c']);             // → ['a', 'b', 'c']
```

#### `chunk(arr, size)`
Split array into chunks of specified size.
```javascript
chunk([1, 2, 3, 4, 5, 6], 2);             // → [[1, 2], [3, 4], [5, 6]]
chunk(['a', 'b', 'c', 'd'], 3);           // → [['a', 'b', 'c'], ['d']]
```

#### `shuffle(arr)`
Shuffle array elements randomly.
```javascript
shuffle([1, 2, 3, 4, 5]);                 // → [3, 1, 5, 2, 4] (random)
```

### 🎯 Object Utils

#### `deepMerge(...objects)`
Deep merge multiple objects.
```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
deepMerge(obj1, obj2);                     // → { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

#### `clone(obj)`
Deep clone an object.
```javascript
const original = { a: 1, b: { c: 2 } };
const cloned = clone(original);
cloned.b.c = 3;
console.log(original.b.c);                // → 2 (unchanged)
```

### 🎲 Misc Utils

#### `uuid()`
Generate a UUID v4.
```javascript
uuid();                                    // → 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

#### `copyToClipboard(text)`
Copy text to clipboard (async).
```javascript
await copyToClipboard('Hello World');     // → true (success)
```

#### `colorize(text, color)`
Colorize text for CLI output.
```javascript
colorize('Success!', 'green');            // → colored text
colorize('Error!', 'red');                // → colored text
```

## 🖥️ CLI Usage

Ultra Utils comes with a built-in CLI for quick utility access:

```bash
# Show help
npx ultra-utils

# String utilities
npx ultra-utils slugify "My Blog Post"
npx ultra-utils toTitleCase "hello world"
npx ultra-utils truncate "Long text here" 10

# Date utilities
npx ultra-utils timeAgo "2025-09-10"
npx ultra-utils formatDate "2025-09-16"

# Validation
npx ultra-utils isEmail "test@example.com"
npx ultra-utils isUrl "https://example.com"

# Number utilities
npx ultra-utils commaNumber 1234567
npx ultra-utils randomInt 1 100
npx ultra-utils bytes 1048576

# Array utilities (use JSON format)
npx ultra-utils unique "[1,2,2,3]"
npx ultra-utils chunk "[1,2,3,4]" 2
npx ultra-utils shuffle "[1,2,3,4,5]"

# Generate UUID
npx ultra-utils uuid
```

## 🌟 Examples

### Web Development
```javascript
import { slugify, formatDate, isEmail } from 'ultra-utils';

// Create URL-friendly slugs
const postSlug = slugify('My Amazing Blog Post!');  // → 'my-amazing-blog-post'

// Format dates for display
const displayDate = formatDate(new Date(), 'DD/MM/YYYY'); // → '16/09/2025'

// Validate user input
const validEmail = isEmail(userInput);  // → true/false
```

### Data Processing
```javascript
import { unique, chunk, bytes } from 'ultra-utils';

// Remove duplicates from API response
const uniqueItems = unique(apiResponse.items);

// Process data in batches
const batches = chunk(largeDataset, 100);

// Display file sizes
const fileSize = bytes(file.size);  // → '2.5 MB'
```

### CLI Tools
```javascript
import { colorize, timeAgo } from 'ultra-utils';

console.log(colorize('✅ Success!', 'green'));
console.log(colorize('❌ Error!', 'red'));
console.log(`Last updated: ${timeAgo(lastModified)}`);
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern utility libraries like Lodash and Ramda
- Built with ❤️ for the JavaScript community
- Zero dependencies philosophy for maximum compatibility

---

**Made with ❤️ by the Ultra Utils team**
