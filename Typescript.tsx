// 5. Tuples
// A tuple is a fixed-size collection of elements, where each element can be of a different type. 
// Tuples are often used to represent a single set of related values.

// (TypeScript)
// length: Returns the number of elements in the tuple.
// concat: Combines tuples or arrays, returning a new array.
// includes: Checks if a tuple contains a specific value.

const tuple: [number, string, boolean] = [1, "hello", true];

// length
length = tuple.length; // 3

// concat
const newTuple = tuple.concat([2, "world", false]); // [1, "hello", true, 2, "world", false]

// includes
const hasHello = tuple.includes("hello"); // true

// What is Typescript?

// Components of Typescript (pretty much the same as first question)

// Why should we use Typescript

// Access Modifiers

// What type did Typescript add to Javascript?

// Difference between interface and type?

// Generic types

// Structural Typing
// Private fields rules
// Never vs unknown vs any 
// Declare keyword
// What are ambients?