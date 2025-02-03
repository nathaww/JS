// In JavaScript, modules allow you to split code into separate files, 
// making it more maintainable and reusable. You can export and import functions, objects,
//  and other pieces of code between different files.

// 1. Exporting Modules
// There are two primary ways to export in JavaScript: named exports and default exports.

// Named Exports
// With named exports, you export multiple items from a module by specifying their names.

// Example:
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
// Default Export
// With a default export, you export a single item from a module.
//  This is useful when you want to export a single value, function, or class.

// Example:
// calculator.js
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};
export default calculator;

// 2. Importing Modules
// You can import the items exported from another module into the current file.

// Importing Named Exports
// To import named exports, you use curly braces {} to specify what you want to import.

// Example:

// main.js
import { add, subtract } from './math.js';

console.log(add(2, 3)); // 5
console.log(subtract(5, 3)); // 2
// Importing Default Export
// When importing a default export, you can name the import anything you like (without using curly braces).

// Example:

// main.js
import calculator from './calculator.js';

console.log(calculator.add(2, 3)); // 5
console.log(calculator.subtract(5, 3)); // 2

// 3. Import All Exports
// You can import everything from a module using * as:

// Example:

// main.js
import * as math from './math.js';

console.log(math.add(2, 3)); // 5
console.log(math.subtract(5, 3)); // 2
// 4. Re-exporting Modules
// You can also re-export modules from one file to another:

// Example:

// utils.js
export * from './math.js';
export { default as calculator } from './calculator.js';

// 5. Dynamic Imports
// JavaScript allows you to dynamically import modules using import() as a function.
// This is useful when you want to load a module on-demand (e.g., for code splitting or lazy loading).

// Example:

async function loadCalculator() {
  const { default: calculator } = await import('./calculator.js');
  console.log(calculator.add(2, 3)); // 5
}
loadCalculator();

// Summary of Syntax:
// Named export: export const functionName = ...;
// Default export: export default object;
// Named import: import { functionName } from './module';
// Default import: import functionName from './module';
// Dynamic import: const module = await import('./module');
// This modular approach allows for better code organization, easier debugging, and reusability of components