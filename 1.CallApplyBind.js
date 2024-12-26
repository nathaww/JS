// These methods allow you to explicitly set the value of this in a function. 
// The this keyword usually refers to the context in which a function is called. 
// Using apply, call, or bind, you can override this default behavior.

// Call
//  - Invokes the function immediately with the provided this context and arguments.
//  - Syntax: function.call(thisArg, arg1, arg2, ...)

function greet(greeting) {
  console.log(`${greeting}, I am ${this.name}`);
}
const person1 = { name: "Alice" };
greet.call(person, "Hello"); // Output: "Hello, I am Alice"


// Apply
//  - Similar to call, but accepts arguments as an array or an array-like object.
//  - Syntax: function.apply(thisArg, [argsArray])

const numbers = [1, 2, 3];
console.log(Math.max.apply(null, numbers)); // Output: 3


// Bind
//  - Returns a new function with the provided this context and optional arguments.
//    The function is not invoked immediately.
//  - Syntax: function.bind(thisArg, arg1, arg2, ...)

const person2 = { name: "Bob" };
function greet() {
  console.log(`Hi, I am ${this.name}`);
}
const boundGreet = greet.bind(person);
boundGreet(); // Output: "Hi, I am Bob"


// 1. Context Override with call and bind
// Using call
// Overrides the default this for a single invocation.

const person3 = { name: "Charlie" };
function introduce(age) {
  console.log(`I am ${this.name} and I am ${age} years old.`);
}
introduce.call(person, 30); // Output: "I am Charlie and I am 30 years old."

// Using bind
// Creates a permanently bound version of the function for future invocations.

const person4 = { name: "Diana" };
const boundIntroduce = introduce.bind(person);
boundIntroduce(25); // Output: "I am Diana and I am 25 years old."


// 2. Using apply with Dynamic Arguments
// apply is particularly useful when the number of arguments is unknown or dynamic.

function sum(a, b, c) {
  return a + b + c;
}
const numbers2 = [1, 2, 3];
console.log(sum.apply(null, numbers)); // Output: 6

// Real-World Use Case: Flattening Arrays
const arrays = [[1, 2], [3, 4], [5, 6]];
const flatArray = [].concat.apply([], arrays);
console.log(flatArray); // Output: [1, 2, 3, 4, 5, 6]


// 3. Explicit Binding with Prototypes
// When creating custom methods on prototypes, you can use call or bind to explicitly bind this.

function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function(sound) {
  console.log(`${this.name} says ${sound}`);
};

const dog = new Animal("Buddy");
dog.speak("Woof!"); // Output: "Buddy says Woof!"

// Using explicit binding
const speak = dog.speak;
speak.call(dog, "Bark!"); // Output: "Buddy says Bark!"

// Using bind for a Permanent Binding
const boundSpeak = dog.speak.bind(dog);
boundSpeak("Growl!"); // Output: "Buddy says Growl!"



// Feature	    Call	                Apply	                      Bind
// Invocation	  - Immediate	          - Immediate	                - Returns a new function
// Arguments	  - Passed individually	- Passed as an array	      - Passed individually or later
// Use Case	    - Simple invocations	- Dynamic argument handling	- Persistent this binding