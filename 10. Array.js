// 1. Arrays
// An array is a collection of elements, typically of the same type, stored in contiguous memory locations.
//  Arrays are often indexed by integers, starting from zero.

// push: Adds one or more elements to the end of an array.
// pop: Removes the last element from an array.
// shift: Removes the first element from an array.
// unshift: Adds one or more elements to the beginning of an array.
// map: Creates a new array with the results of calling a function on every element.
// filter: Creates a new array with all elements that pass a given test.
// reduce: Applies a function against an accumulator and each element to reduce it to a single value.

const complexArray = [];

complexArray[5] = "hello"; //[ <5 empty items>, 'hello' ]

const array = [1, 2, 3, 4];

// push
array.push(5); // [1, 2, 3, 4, 5]
array.push(undefined); //[ 1, 2, 3, 4, 5, undefined ]

// pop
array.pop(); // [1, 2, 3, 4]

// shift
array.shift(); // [2, 3, 4]

// unshift
array.unshift(0); // [0, 2, 3, 4]

// map
const doubled = array.map((x) => x * 2); // [0, 4, 6, 8]

// filter
const even = array.filter((x) => x % 2 === 0); // [0, 2, 4]

// reduce
const sum = array.reduce((acc, x) => acc + x, 0); // 9

// 1. Sparse Arrays and Index Behavior
// Question:
// Explain the difference between arr.length and arr.push(undefined)
// when adding an undefined element to an array. What’s the result of the following code snippet, and why?

const arr = [];
arr[5] = "hello";
console.log(arr.length); // ?
console.log(arr); // ?

// Answer:

// arr.length will be 6 because setting arr[5] = "hello" creates a sparse array
// with indices from 0 to 5, even though indices 0 through 4 are empty (or "holes").
// arr will be [ <5 empty items>, 'hello' ]. The array has 6 slots,
// but the first 5 slots are "empty items" due to the sparse nature of the array,
// created by directly assigning a value to an index.

// 2. Array.prototype.sort() with Non-Stable Sorting
// Question:
// In JavaScript, Array.prototype.sort() does not guarantee a stable
// sort (elements with the same value are not guaranteed to maintain their relative order) across all engines.
//  Explain what a stable sort is, why it matters, and how you could implement a stable sort on an array
//  if the built-in sort() is not stable.

// Answer:

// A stable sort maintains the relative order of elements with equal values. This is important when sorting
//  complex data (like objects) where secondary attributes may be meaningful, even if primary attributes are equal.
// JavaScript’s sort() may be unstable on some engines, meaning it might reorder elements with equal values.
// Solution for a stable sort:

const stableSort = (arr, compareFn) => {
  return arr
    .map((value, index) => ({ value, index }))
    .sort((a, b) => {
      const order = compareFn(a.value, b.value);
      return order === 0 ? a.index - b.index : order;
    })
    .map(({ value }) => value);
};

// Example usage:
const Arr = [5, 3, 3, 1];
const sorted = stableSort(Arr, (a, b) => a - b); // [1, 3, 3, 5]
// This implementation retains original order by attaching indices to each element,
//  sorting them, and then extracting values.

let numbers = [1, 10, 3, 5, 7, 6, 8, 4, 2, 9];

// lexicographic order not alphabetical order for default sort function (sort())
// numbers.sort();
numbers.sort((a, b) => a - b); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
numbers.sort((a, b) => b - a); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
console.log(numbers);


const peps =[
    {name: "sb", age: 30, gpa: 3.0},
    {name: "pa", age: 37, gpa: 1.5},
    {name: "sw", age: 51, gpa: 2.5},
    {name: "sa", age: 27, gpa: 4.0}
]

peps.sort((a, b) => a.age - b.age ) //for number
peps.sort((a, b) => a.name.localeCompare(b.name) ) //for string
console.log(peps, "peps")
