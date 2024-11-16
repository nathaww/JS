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

const x = 10;
x = 20; // TypeError: Assignment to constant variable.

const arr = [1, 2, 3];
arr.push(4); // Allowed (array contents can change)
console.log(arr); // [1, 2, 3, 4]
