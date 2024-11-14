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
const sumDefault = array.reduce((acc, x) => acc + x); // 14
const sum = array.reduce((acc, x) => acc + x, 0); // 14
const sumWithInitialValue = array.reduce((acc, x) => acc + x, 9); // 23
// console.log(sum, sumDefault, sumWithInitialValue)
// reduce(callbackFn)
// reduce(callbackFn, initialValue)

// 1. Sparse Arrays and Index Behavior
// Question:
// Explain the difference between arr.length and arr.push(undefined)
// when adding an undefined element to an array. What’s the result of the following code snippet, and why?

const arr = [];
arr[5] = "hello";
// console.log(arr.length);
// console.log(arr);

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
// console.log(numbers);

const peps = [
  { name: "sb", age: 30, gpa: 3.0 },
  { name: "pa", age: 37, gpa: 1.5 },
  { name: "sw", age: 51, gpa: 2.5 },
  { name: "sa", age: 27, gpa: 4.0 },
];

peps.sort((a, b) => a.age - b.age); //for number
peps.sort((a, b) => a.name.localeCompare(b.name)); //for string
// console.log(peps, "peps")

// 3. Array.prototype.reduce() and Initial Accumulator Value
// Question:
// Consider the following code. Explain why reduce behaves
// differently in each case and provide the output for both.

const arr = [1, 2, 3];
const sumWithInitial = arr.reduce((acc, val) => acc + val, 10);
const sumWithoutInitial = arr.reduce((acc, val) => acc + val);

// Answer:

// sumWithInitial results in 16 because 10 is provided as the initial accumulator value,
// so reduce starts by adding 10 + 1 + 2 + 3.sumWithoutInitial results in 6. When no initial value is provided,
// the first element (1) is used as the initial accumulator, so it sums 1 + 2 + 3.
// Providing an initial value ensures consistent behavior,
//  especially with empty arrays (where reduce throws an error without an initial value).

// 4. Mutating Methods vs. Non-Mutating Methods
// Question:
// Explain the difference between mutating and non-mutating array methods in JavaScript.
// Given the following code, identify which methods mutate arr and provide the final state of arr.

let arr = [1, 2, 3, 4];
arr = arr.concat([5]); // Non-mutating
arr.push(6); // Mutating
arr.slice(1, 4); // Non-mutating
arr.splice(1, 2); // Mutating
arr.map((x) => x * 2); // Non-mutating

// Answer:

// Mutating methods directly alter the original array (e.g., push, splice).
// Non-mutating methods return a new array without changing the original one (e.g., concat, slice, map).
// Explanation of final state of arr:

// Methods That Mutate the Array
// These methods change the original array:

// push(): Adds one or more elements to the end of the array. Returns the new length of the array.
// pop(): Removes the last element of the array. Returns the removed element.
// shift(): Removes the first element of the array. Returns the removed element.
// unshift(): Adds one or more elements to the beginning of the array. Returns the new length of the array.
// splice(start, deleteCount, item1, item2, ...): Adds/removes elements from the array at a specific index. Returns an array of removed elements.
// sort(compareFunction): Sorts the elements of an array in place. Returns the sorted array.
// reverse(): Reverses the order of elements in the array. Returns the reversed array.
// copyWithin(target, start, end): Copies part of the array to another location in the same array. Returns the modified array.
// fill(value, start, end): Fills all elements from a start index to an end index with a static value. Returns the modified array.

// Methods That Do Not Mutate the Array
// These methods return a new array or a different value and keep the original array intact:

// concat(array2, array3, ...): Merges two or more arrays. Returns a new array.
// slice(start, end): Extracts a section of the array into a new array. Returns a new array.
// map(callback): Creates a new array with the results of calling a function on every element in the array. Returns a new array.
// filter(callback): Creates a new array with all elements that pass the test implemented by the provided function. Returns a new array.
// reduce(callback, initialValue): Executes a reducer function on each element, resulting in a single output value. Returns a single value.
// reduceRight(callback, initialValue): Like reduce, but processes array elements from right to left. Returns a single value.
// find(callback): Returns the value of the first element that satisfies the testing function. Returns a single value.
// findIndex(callback): Returns the index of the first element that satisfies the testing function. Returns a single value.
// indexOf(element): Returns the first index at which a given element can be found in the array. Returns a single value.
// lastIndexOf(element): Returns the last index at which a given element can be found in the array. Returns a single value.
// every(callback): Tests whether all elements pass the provided function. Returns a boolean.
// some(callback): Tests whether at least one element passes the provided function. Returns a boolean.
// includes(element): Determines whether an array includes a certain element. Returns a boolean.
// join(separator): Joins all elements of an array into a string. Returns a string.
// flat(depth): Flattens nested arrays into a single array up to the specified depth. Returns a new array.
// flatMap(callback): Maps each element and then flattens the result into a new array. Returns a new array.

// 5. Destructuring and Rest Parameters in Arrays
// Question:
// Using array destructuring and the rest parameter, write a function that takes an array and
// returns an object with the first element as head, the last element as tail, and an array of all
//  the remaining elements as middle. How would your function handle an array with fewer than three elements?

// Answer:
// Here’s how to write the function with destructuring:

function splitArray(arr) {
  const [head, ...rest] = arr;
  const tail = rest.pop();
  return {
    head: head ?? null,
    middle: rest.length ? rest : null,
    tail: tail ?? null,
  };
}

// Examples:
console.log(splitArray([1, 2, 3, 4])); // { head: 1, middle: [2, 3], tail: 4 }
console.log(splitArray([1])); // { head: 1, middle: null, tail: null }
console.log(splitArray([])); // { head: null, middle: null, tail: null }
// Explanation:

// Destructuring: The head is the first element, rest captures all remaining elements, and tail is the last element of rest.
// Edge case handling: For arrays with fewer than three elements, we use ?? null to set missing elements as null.
