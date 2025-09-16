#!/usr/bin/env node

import * as utils from '../src/index.js';

const { colorize } = utils;

// CLI Help text
const HELP_TEXT = `
${colorize('🚀 Ultra Utils CLI', 'cyan')}
${colorize('A lightweight utility library for JavaScript', 'white')}

${colorize('Usage:', 'yellow')}
  npx ultra-utils <function> [args...]

${colorize('Available Functions:', 'green')}
  ${colorize('String Utils:', 'magenta')}
    slugify "Hello World"           → hello-world
    toTitleCase "hello world"       → Hello World
    truncate "Long text" 10         → Long te...

  ${colorize('Date Utils:', 'magenta')}
    formatDate "2025-09-16"         → 2025-09-16
    timeAgo "2025-09-10"            → 6 days ago

  ${colorize('Validation:', 'magenta')}
    isEmail "test@example.com"      → true
    isUrl "https://example.com"     → true
    isEmpty ""                      → true

  ${colorize('Number Utils:', 'magenta')}
    commaNumber 1234567             → 1,234,567
    randomInt 1 10                  → (random 1-10)
    bytes 1024                      → 1 KB

  ${colorize('Array Utils:', 'magenta')}
    unique "[1,2,2,3]"              → [1,2,3]
    chunk "[1,2,3,4]" 2             → [[1,2],[3,4]]
    shuffle "[1,2,3]"               → (shuffled array)

  ${colorize('Object Utils:', 'magenta')}
    uuid                            → (generates UUID)

${colorize('Examples:', 'yellow')}
  npx ultra-utils slugify "My Blog Post Title"
  npx ultra-utils timeAgo "2025-09-10"
  npx ultra-utils randomInt 1 100
`;

// Parse JSON safely
function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

// Format output
function formatOutput(result) {
  if (typeof result === 'object') {
    return colorize(JSON.stringify(result, null, 2), 'green');
  }
  return colorize(String(result), 'green');
}

// Main CLI function
function runCLI() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(HELP_TEXT);
    return;
  }

  const [functionName, ...params] = args;
  
  // Check if function exists
  if (!(functionName in utils.default)) {
    console.error(colorize(`❌ Function '${functionName}' not found`, 'red'));
    console.log(colorize('\n💡 Run without arguments to see available functions', 'yellow'));
    process.exit(1);
  }

  try {
    const func = utils.default[functionName];
    
    // Parse parameters
    const parsedParams = params.map(param => {
      // Try to parse as JSON first, fallback to string
      if (param.startsWith('[') || param.startsWith('{') || param === 'true' || param === 'false' || !isNaN(param)) {
        return parseJSON(param);
      }
      return param;
    });

    // Execute function
    const result = func(...parsedParams);
    
    // Handle async functions
    if (result instanceof Promise) {
      result.then(res => {
        console.log(colorize('✅ Result:', 'cyan'));
        console.log(formatOutput(res));
      }).catch(err => {
        console.error(colorize(`❌ Error: ${err.message}`, 'red'));
        process.exit(1);
      });
    } else {
      console.log(colorize('✅ Result:', 'cyan'));
      console.log(formatOutput(result));
    }
    
  } catch (error) {
    console.error(colorize(`❌ Error: ${error.message}`, 'red'));
    process.exit(1);
  }
}

// Run CLI
runCLI();
