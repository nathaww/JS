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