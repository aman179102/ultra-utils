#!/usr/bin/env node

/**
 * Sample test suite for Ultra Utils
 * Run with: node tests/sample.test.js
 */

import utils from '../src/index.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    failed++;
  }
}

function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(message);
  }
}

console.log('🧪 Running Ultra Utils Tests\n');

// String Utils Tests
test('slugify converts text to slug', () => {
  assert(utils.slugify('Hello World!') === 'hello-world');
  assert(utils.slugify('My Blog Post Title') === 'my-blog-post-title');
});

test('toTitleCase converts to title case', () => {
  assert(utils.toTitleCase('hello world') === 'Hello World');
  assert(utils.toTitleCase('the quick brown fox') === 'The Quick Brown Fox');
});

test('truncate shortens text', () => {
  assert(utils.truncate('Long text here', 10) === 'Long te...');
  assert(utils.truncate('Short', 10) === 'Short');
});

// Date Utils Tests
test('formatDate formats dates', () => {
  const date = new Date('2025-09-16T14:30:00');
  assert(utils.formatDate(date, 'YYYY-MM-DD') === '2025-09-16');
  assert(utils.formatDate(date, 'DD/MM/YYYY') === '16/09/2025');
});

test('timeAgo returns relative time', () => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - 60000); // 1 minute ago
  const result = utils.timeAgo(pastDate);
  assert(result.includes('minute') || result === 'just now');
});

// Validation Tests
test('isEmail validates emails', () => {
  assert(utils.isEmail('test@example.com') === true);
  assert(utils.isEmail('invalid-email') === false);
});

test('isUrl validates URLs', () => {
  assert(utils.isUrl('https://example.com') === true);
  assert(utils.isUrl('not-a-url') === false);
});

test('isEmpty checks empty values', () => {
  assert(utils.isEmpty('') === true);
  assert(utils.isEmpty([]) === true);
  assert(utils.isEmpty({}) === true);
  assert(utils.isEmpty(null) === true);
  assert(utils.isEmpty('hello') === false);
});

// Number Utils Tests
test('commaNumber formats numbers', () => {
  assert(utils.commaNumber(1234567) === '1,234,567');
  assert(utils.commaNumber(1000) === '1,000');
});

test('randomInt generates random integers', () => {
  const result = utils.randomInt(1, 10);
  assert(result >= 1 && result <= 10);
});

test('bytes converts to human readable', () => {
  assert(utils.bytes(1024) === '1 KB');
  assert(utils.bytes(1048576) === '1 MB');
});

// Array Utils Tests
test('unique removes duplicates', () => {
  const result = utils.unique([1, 2, 2, 3, 3, 4]);
  assert(JSON.stringify(result) === JSON.stringify([1, 2, 3, 4]));
});

test('chunk splits arrays', () => {
  const result = utils.chunk([1, 2, 3, 4], 2);
  assert(JSON.stringify(result) === JSON.stringify([[1, 2], [3, 4]]));
});

test('shuffle randomizes arrays', () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = utils.shuffle(original);
  assert(shuffled.length === original.length);
  assert(original.every(item => shuffled.includes(item)));
});

// Object Utils Tests
test('deepMerge merges objects', () => {
  const obj1 = { a: 1, b: { c: 2 } };
  const obj2 = { b: { d: 3 }, e: 4 };
  const result = utils.deepMerge(obj1, obj2);
  assert(result.a === 1);
  assert(result.b.c === 2);
  assert(result.b.d === 3);
  assert(result.e === 4);
});

test('clone deep clones objects', () => {
  const original = { a: 1, b: { c: 2 } };
  const cloned = utils.clone(original);
  cloned.b.c = 3;
  assert(original.b.c === 2);
});

// Misc Utils Tests
test('uuid generates valid UUIDs', () => {
  const id = utils.uuid();
  assert(typeof id === 'string');
  assert(id.length === 36);
  assert(id.includes('-'));
});

test('colorize adds color codes', () => {
  const colored = utils.colorize('test', 'red');
  assert(colored.includes('test'));
  assert(colored.includes('\x1b['));
});

// Summary
console.log(`\n📊 Test Results:`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed!');
}
