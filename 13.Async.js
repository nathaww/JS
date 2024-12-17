/*
Promise 
- Used for async operations 
- Solves the callback hell problem 
- returns two values resolve or reject 
- once its resolved it doesn't execute further 
*/

// What is a Promise?

// A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.
// It has four states:
// Pending: Initial state, neither fulfilled nor rejected.
// Fulfilled: Operation completed successfully.
// Rejected: Operation failed.

// Internal States
// [[PromiseState]] (State of a promise)
// - pending, fulfilled, rejected

// [[PromiseResult]] (Result of a promise)
// - If the promise is fulfilled, [[PromiseResult]] holds the resolved value.
// - If the promise is rejected, [[PromiseResult]] holds the error reason.
// - If the promise is pending, [[PromiseResult]] is undefined.

// [[PromiseFulfillReaction]]
// - A reaction that is triggered when a promise transitions to the fulfilled state.
// - Internal steps include:
// - Retrieving the fulfillment value ([[PromiseResult]]).
// - Passing the value to the fulfillment handler if one exists.

// [[PromiseRejectReaction]]
// - A reaction that is triggered when a promise transitions to the rejected state.
// - Internal steps include:
// - Retrieving the rejection reason ([[PromiseResult]]).
// - Passing the reason to the rejection handler if one exists.

// [[PromiseIsHandled]]
// - A flag that tracks whether a promise's rejection has been handled.
// - When a promise is rejected but no .catch() handler is attached, the flag is false,
//   and it may trigger an unhandled rejection warning.
// - If a .catch() or equivalent handler is attached, PromiseIsHandled is set to true.

let pr = new Promise((resolve, reject) => {
  resolve("yeah");
  reject("no");
});

pr.then((msg) => {
  console.log(msg);
})
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("done");
  });

const cSqr = (val) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val * val);
      reject("Failed");
    }, 2000);
  });
};

cSqr(9)
  .then((val) => {
    console.log(val);
    return cSqr(val);
  })
  .then((val2) => {
    console.log(val2);
  })
  .catch((err) => {
    console.log(err);
  });

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  // Perform an async operation
  if (true) reject("Success")
  else resolve("Error");
});

// Consuming a Promise
// Using .then() and .catch()
myPromise
  .then((result) => {
    console.log(result); // "Success"
  })
  .catch((error) => {
    console.error(error); // "Error"
  });

// Using finally()
myPromise.finally(() => {
  console.log("Promise settled"); // Always runs
});

// Promise States
// A Promise's state transitions:
// Pending → Fulfilled or Rejected.
// Once resolved or rejected, it cannot change state.

// Intermediate Concepts
// Chaining Promises
// .then() returns a new Promise, allowing chaining:
myPromise
  .then((result) => {
    return result + " and more work";
  })
  .then((newResult) => {
    console.log(newResult);
  });

// Error Handling
// Errors propagate down the chain unless handled.
myPromise
  .then(() => {
    throw new Error("Oops!");
  })
  .catch((error) => {
    console.error(error); // Handles any error in the chain
  });

// Promise.all()
// Resolves when all Promises in the array resolve; rejects if any Promise rejects.
Promise.all([promise1, promise2])
  .then((results) => {
    console.log(results); // Array of results
  })
  .catch((error) => {
    console.error(error); // First error encountered
  });

// Promise.race()
// Resolves or rejects as soon as the first Promise resolves or rejects.

Promise.race([promise1, promise2]).then((result) => {
  console.log(result); // First resolved value
});

// Promise.allSettled()
// Waits for all Promises to settle (fulfilled or rejected).

Promise.allSettled([promise1, promise2]).then((results) => {
  console.log(results); // Array of objects with `status` and `value/reason`
});

// Promise.any()
// Resolves as soon as the first fulfilled Promise resolves; rejects if all Promises reject.

Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result); // First resolved value
  })
  .catch((error) => {
    console.error(error); // AggregateError if all Promises reject
  });

// Advanced Topics
// Custom Utility Functions with Promises
// promisify: Converting a callback-based function to a Promise-based one.

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
}

// Microtasks and Event Loop
// Promises are part of the microtask queue, which is processed before the macrotask queue (e.g., setTimeout).

console.log("Start");

Promise.resolve().then(() => console.log("Microtask"));

setTimeout(() => console.log("Macrotask"), 0);

console.log("End");
// Output: Start, End, Microtask, Macrotask
Async / Await;

// Syntactic sugar for working with Promises.

async function fetchData() {
  try {
    const data = await myPromise;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Cancellation of Promises
// Promises cannot be canceled natively, but patterns can be implemented.

function cancellablePromise() {
  let cancel;
  const promise = new Promise((resolve, reject) => {
    cancel = () => reject("Cancelled");
    setTimeout(() => resolve("Resolved"), 1000);
  });
  return { promise, cancel };
}
const { promise, cancel } = cancellablePromise();
cancel(); // Rejects the promise

// Promise Combinators
// Combining Promise.all() with error handling:

const promises = [promise1, promise2];
Promise.all(promises.map((p) => p.catch((error) => ({ error })))).then(
  (results) => {
    console.log(results); // Contains both values and errors
  }
);

// Common Interview Questions
// Difference between Promise.all and Promise.allSettled?

// Promise.all short-circuits if any Promise rejects.
// Promise.allSettled waits for all Promises to settle.

// How does Promise.race behave with a rejection?
// Resolves or rejects based on the first settled Promise.

// What are microtasks in Promises?
// Explain their priority in the event loop.

// How do you debug Promise chains?
// Use console.log, breakpoints, or tools like async stack traces.

// What happens if you don’t handle a rejected Promise?
// Results in an UnhandledPromiseRejectionWarning in Node.js or ignored in browsers.
// Practical Exercises
// Write a function to retry a Promise n times.

function retryPromise(promiseFn, retries) {
  return promiseFn().catch((err) => {
    if (retries > 0) return retryPromise(promiseFn, retries - 1);
    throw err;
  });
}
// Timeout a Promise if it takes too long.

function promiseWithTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject("Timed out"), timeout)),
  ]);
}
// Simulate a Promise pool with limited concurrency.

async function promisePool(limit, promises) {
  const results = [];
  const executing = new Set();

  for (const promiseFn of promises) {
    const p = promiseFn().finally(() => executing.delete(p));
    results.push(p);
    executing.add(p);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Async await

// Async await IIFE
