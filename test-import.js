#!/usr/bin/env node

// Test named imports
import { isEmpty, isEmail, slugify } from './src/index.js';

console.log('Testing named imports:');
console.log('isEmpty(""):', isEmpty(''));
console.log('isEmpty([]):', isEmpty([]));
console.log('isEmpty({}):', isEmpty({}));
console.log('isEmpty("hello"):', isEmpty('hello'));

console.log('\nTesting other functions:');
console.log('isEmail("test@example.com"):', isEmail('test@example.com'));
console.log('slugify("Hello World"):', slugify('Hello World'));

console.log('\n✅ All imports working correctly!');
