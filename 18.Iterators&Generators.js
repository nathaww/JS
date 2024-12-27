// An iterator is an object that provides a sequence of values, one at a time, when its next() method is called.

// Key Concepts
// Iterator protocol: An object must have a next() method that returns an object with two properties:
// value: The current value.
// done: A boolean indicating if the iteration is complete.
// Example: Creating a Simple Iterator

function createIterator(array) {
  let index = 0;
  return {
    next: function () {
      if (index < array.length) {
        return { value: array[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    }
  };
}

const iterator = createIterator(['a', 'b', 'c']);
console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: 'c', done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 2. Iterables
// An object is iterable if it implements the Iterable protocol, meaning it has a [Symbol.iterator] 
// method that returns an iterator.

// Example: Making an Object Iterable

const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const value of myIterable) {
  console.log(value); // 1, 2, 3
}

// 3. Generators
// A generator is a function that can be paused and resumed. It simplifies the creation of iterators.

// Key Features
// Declared using function* syntax.
// Use the yield keyword to pause and produce values.
// Automatically conforms to the iterator protocol.
// Example: A Simple Generator

function* myGenerator() {
  yield 'Hello';
  yield 'World';
  yield '!';
}

const gen = myGenerator();
console.log(gen.next()); // { value: 'Hello', done: false }
console.log(gen.next()); // { value: 'World', done: false }
console.log(gen.next()); // { value: '!', done: false }
console.log(gen.next()); // { value: undefined, done: true }

// 4. Infinite Iterators
// Generators are great for creating infinite sequences.

// Example: Infinite Fibonacci Sequence

function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5

// 5. Generators for Async Programming
// Generators can be combined with Promises to manage asynchronous workflows.

// Example: Async Workflow with Generators

function* asyncTask() {
  console.log('Start Task');
  yield new Promise((resolve) => setTimeout(() => resolve('Step 1 Complete'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Step 2 Complete'), 1000));
  console.log('End Task');
}

const task = asyncTask();

task.next().value.then((res) => {
  console.log(res); // Step 1 Complete
  return task.next().value;
}).then((res) => {
  console.log(res); // Step 2 Complete
  task.next();
});

// 6. Delegating Generators
// A generator can delegate its control to another generator using yield*.

// Example: Delegation

function* subGenerator() {
  yield 1;
  yield 2;
}

function* mainGenerator() {
  yield* subGenerator();
  yield 3;
}

const gen2 = mainGenerator();
console.log([...gen]); // [1, 2, 3]
// 7. Iterators vs Generators
// Feature	Iterators	Generators
// Syntax	Explicit next() method	function* with yield keyword
// State Management	Manual	Automatically managed
// Readability	Less concise	More concise

// 8. Advanced Usage
// Custom iterable objects: Enhance data structures (like trees, graphs) to be iterable using generators.
// Controlled iteration: Pause and resume heavy computations.
// Event listeners: Use generators to listen and react to asynchronous events.

// 9. Practical Examples
// Example 1: Range Generator

function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

console.log([...range(1, 10, 2)]); // [1, 3, 5, 7, 9]
// Example 2: Generators in a Pipeline

function* uppercase(strings) {
  for (const str of strings) {
    yield str.toUpperCase();
  }
}

function* appendExclamation(strings) {
  for (const str of strings) {
    yield `${str}!`;
  }
}

const pipeline = appendExclamation(uppercase(['hello', 'world']));
console.log([...pipeline]); // ['HELLO!', 'WORLD!']