// What is a Closure?
// A closure is a function that:

// Remembers its lexical environment, even when executed outside its original scope.
// Has access to:
// Its own variables.
// Variables from its outer (parent) function scope.
// Variables from the global scope.
// Why Closures Work:
// Closures are possible because of lexical scoping and the fact that JavaScript maintains the reference to
//  the parent function's scope even after the function has returned.

// 3. How Execution Context and Closures Work Together
// When a function is created, it carries a reference to its lexical environment (the scope it was defined in).
// When the function is invoked, JavaScript uses this reference to resolve variable lookups.

// Example:

function outer() {
  let count = 0;

  function inner() {
    count++; // Accessing 'count' from outer's scope
    console.log(count);
  }

  return inner;
}

const counter = outer(); // 'outer' execution context is closed over
counter(); // 1
counter(); // 2
// Explanation:

// Execution Context of outer:
// count is initialized to 0.
// The inner function is defined, and it closes over count.
// When outer returns inner, the outer execution context is not destroyed because inner keeps a reference to it.
// Each call to counter updates count in the preserved outer scope.

// 4. Key Characteristics of Closures
// Persistence of Scope: The inner function retains access to variables in the outer scope.
// Encapsulation: Closures can be used to encapsulate variables, making them private.
// Example (Encapsulation):

function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter2 = createCounter();
console.log(counter.increment()); // 1
console.log(counter.decrement()); // 0
console.log(counter.getCount());  // 0

// 5. Memory Implications
// Closures can sometimes lead to memory issues because variables in the closed-over scope 
// remain in memory as long as the closure exists. Use them judiciously to avoid memory leaks.

// 6. Common Use Cases of Closures
// Data Hiding/Encapsulation: Making variables private.
// Callbacks: Functions like setTimeout or event listeners often use closures.
// Functional Programming: Building higher-order functions.
// Currying: Breaking functions into smaller functions with retained scope.
// Example (setTimeout with Closures):

function delayedGreeting(name) {
  setTimeout(() => {
    console.log(`Hello, ${name}`);
  }, 1000);
}

delayedGreeting("Bob"); // Hello, Bob

// Summary
// Closures are formed when a function "remembers" its outer scope.
// Execution contexts (global or function) ensure variables are resolved properly.
// Combining these concepts allows JavaScript to implement powerful programming paradigms like data hiding,
//  higher-order functions, and asynchronous callbacks.