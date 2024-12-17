// 1. var (function-scoped, legacy)
// Scope: Function-scoped (available throughout the function where it is declared or globally if declared outside a function).
// Hoisting: Variables declared with var are hoisted to the top of their scope but are initialized as undefined until the assignment.
// Redeclaration: Can be redeclared within the same scope.
// Best Practice: Avoid using var in modern JavaScript development; prefer let or const.

function example() {
  console.log(x); // undefined (hoisted)
  var x = 5;
  console.log(x); // 5
}
example();

// 2. let (block-scoped, modern)
// Scope: Block-scoped (available only within the block {} in which it is declared).
// Hoisting: let is also hoisted but is in a Temporal Dead Zone (TDZ) until the declaration is encountered.
// Redeclaration: Cannot be redeclared in the same scope.
// Use Case: Use let when the variable's value needs to change or reassign.

function example2() {
  console.log(x); // ReferenceError (in TDZ)
  let x = 5;
  console.log(x); // 5
}
example2();

// 3. const (block-scoped, constant)
// Scope: Block-scoped (same as let).
// Hoisting: Similar to let, const is hoisted but in the Temporal Dead Zone (TDZ).
// Immutability: The variable binding is immutable (cannot be reassigned), but the contents of objects or arrays it references can change.
// Use Case: Use const by default for variables that should not be reassigned.

const x1 = 10;
x1 = 20; // TypeError: Assignment to constant variable.

const arr = [1, 2, 3];
arr.push(4); // Allowed (array contents can change)
console.log(arr); // [1, 2, 3, 4]

// 1. Block Scope vs. Function Scope
// var is function-scoped, meaning it is accessible throughout the entire function where it is declared, even outside of the block in which it is defined.
// let is block-scoped, meaning it is only accessible within the block (e.g., if, for, {}) in which it is declared.
// Example:

if (true) {
  var x = 10; // Function-scoped
  let y = 20; // Block-scoped
}

console.log(x); // 10
console.log(y); // ReferenceError: y is not defined
// With let, the variable y is not accessible outside of the block,
//  reducing the risk of accidentally using it in unintended contexts.

// 2. Hoisting Behavior
// Both var and let are hoisted to the top of their scope, but with key differences:
// Variables declared with var are initialized with undefined during the hoisting phase.
// This means you can access them before their declaration without an immediate error
// (but this is a common source of bugs).
// Variables declared with let are not initialized during hoisting. They are in a "temporal dead zone" (TDZ)
// until their declaration is reached. Accessing them before declaration results in a ReferenceError.
// Example:

console.log(a); // undefined (due to var hoisting)
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

// Using let prevents subtle bugs by disallowing the use of a variable before it is explicitly declared
// and initialized.

// 3. Re-declaration
// var allows re-declaration within the same scope, which can accidentally overwrite variables.
// let does not allow re-declaration in the same scope, making your code safer and easier to debug.
// Example:

var a = 1;
var a = 2; // No error

let b = 1;
let b = 2; // SyntaxError: Identifier 'b' has already been declared

// 4. Global Scope Pollution
// When you declare a variable with var at the top level (outside a function), it becomes a property of the global
//  object (window in browsers). This can lead to unintended overwrites and hard-to-track bugs. Variables declared
//  with let do not pollute the global object.

// Example:

var x = 10;
console.log(window.x); // 10

let y = 20;
console.log(window.y); // undefined

// Why Use let Instead of var?
// Predictable scoping: let is block-scoped, preventing unexpected access outside its block.
// Safer hoisting: Avoids the pitfalls of accessing variables before declaration.
// No re-declaration: Prevents accidental overwrites within the same scope.
// Cleaner global namespace: Reduces risk of polluting the global object.
// By using let, your code is easier to maintain, less error-prone, and aligns with modern
//  JavaScript best practices. As an alternative, const can be used for variables that are not reassigned,
//   which provides even stricter guarantees.
