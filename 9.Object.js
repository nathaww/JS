// 2. Objects (or Dictionaries/Maps)
// An object is a collection of key-value pairs, where each key is associated with a specific value.
//  Objects are useful for storing structured data and enabling easy lookups by key.

// Object.keys: Returns an array of an object’s keys.
// Object.values: Returns an array of an object’s values.
// Object.entries: Returns an array of an object’s key-value pairs as nested arrays.
// hasOwnProperty: Checks if an object has a specific property as its own.
// delete: Removes a property from an object.
// assign: Copies all enumerable properties from one or more source objects to a target object.

const people = { name: "Alice", age: 25, city: "Wonderland" };

// Object.keys
const keys = Object.keys(people); // ["name", "age", "city"]

// Object.values
const values = Object.values(people); // ["Alice", 25, "Wonderland"]

// Object.entries
const entries = Object.entries(people); // [["name", "Alice"], ["age", 25], ["city", "Wonderland"]]

// hasOwnProperty
const hasAge = people.hasOwnProperty("age"); // true

// delete
delete people.city; // { name: "Alice", age: 25 }

// assign
const newPeople = Object.assign({}, people, { gender: "female" }); // { name: "Alice", age: 25, gender: "female" }
console.log(newPeople);

// 1. Prototype Manipulation and Inheritance
// Question:
// Explain the output of the following code snippet. Why does obj3.name
// return "Alice" instead of "Bob" or "Charlie"?
// Also, describe how you might modify obj3 to avoid using the
// prototype chain while still having access to both name properties.

const obj1 = { name: "Alice" };
const obj2 = Object.create(obj1);
obj2.name = "Bob";

const obj3 = Object.create(obj2);
obj3.name = "Charlie";

console.log(obj3.name); // What will this output, and why?

// Answer:

// obj3.name will output "Charlie". When accessing properties, JavaScript checks the current object (obj3) first.
// Since name exists on obj3 itself, it doesn't need to look up the prototype chain.
// Removing obj3.name would allow it to inherit the name property from obj2, where name is "Bob",
// and further removing obj2.name would make it inherit "Alice" from obj1.

// 2. Object.freeze and Nested Mutability
// Question:
// Consider the following code. Does Object.freeze make the entire object immutable? Why or why not?
// Propose a method to deeply freeze the entire object, ensuring that no nested properties can be changed.

const person = {
  name: "Alice",
  address: {
    street: "123 Silicon Way",
    city: "Mountain View",
  },
};

Object.freeze(person);
person.address.city = "Paul Alto"; // Does this work?

// Answer:

// Object.freeze only shallow-freezes person, meaning only the top-level
// properties of person (like name and address) are immutable.
//  However, person.address.city can still be modified because address is an object that was not frozen.
// Solution:
// To deeply freeze an object, you could create a recursive function:

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  return obj;
}

deepFreeze(person);
// This function will freeze all nested objects as well, ensuring immutability throughout.

// 3. Property Descriptors and Non-Enumerable Properties
// Question:
// Given the following code, explain why Object.keys(hiddenObj) does not return ["secret"].
// How could you make secret appear in Object.keys without changing the object structure?

const hiddenObj = {};
Object.defineProperty(hiddenObj, "secret", {
  value: "hidden value",
  enumerable: false,
});

console.log(Object.keys(hiddenObj)); // []

// Answer:

// The enumerable: false setting makes secret a non-enumerable property,
//  so Object.keys(hiddenObj) does not include it in the result. To make secret appear,
//  you can redefine it as an enumerable property:

Object.defineProperty(hiddenObj, "secret", {
  enumerable: true,
});
// Now, Object.keys(hiddenObj) will include "secret".

// Object.defineProperty(obj, prop, descriptor)

Object.defineProperty(o, "a", {
  value: 37, // Sets the initial value of the property (37 in this case).
  writable: true, // Allows (true) or disallows (false) modification of the property's value.
  enumerable: true, // Determines whether the property will appear in for...in loops and Object.keys.
  configurable: true, // Allows (true) or disallows (false) the ability to delete the property or change its descriptor attributes.
});

// 4. WeakMap vs. Map in Garbage Collection
// Question:
// Explain the key difference in behavior between Map and WeakMap regarding garbage collection.
// How does this difference make WeakMap suitable for certain use cases, such as managing metadata for object keys?

// Answer:

// A Map holds strong references to its keys, which prevents the keys from being garbage-collected
// as long as they are present in the Map. Conversely, WeakMap holds weak references to its keys,
// meaning that if no other references to the key object exist,it can be garbage-collected even if it’s in the WeakMap.

// This makes WeakMap suitable for cases where you need to attach data to objects without preventing those
//  objects from being garbage-collected, such as caching or storing metadata. If the object is no longer
//  in use elsewhere, it will be cleaned up, along with its associated metadata.





// 5. Customizing toString and valueOf for Custom Objects
// Question:
// How would you implement a custom toString and valueOf on an object representing a bank account so that toString returns the account number as a string, and valueOf returns the balance as a number? Demonstrate how these methods could be useful in an arithmetic operation or string context.

// Example:

const Account = {
  accountNumber: "123-456",
  balance: 1000,
  // Implement toString and valueOf
};

// Answer:

// To achieve this:

const account = {
  accountNumber: "123-456",
  balance: 1000,

  toString() {
    return this.accountNumber;
  },

  valueOf() {
    return this.balance;
  }
};

console.log(String(account)); // "123-456" (calls toString)
console.log(account + 500);   // 1500 (calls valueOf)

// Explanation
// toString returns the accountNumber, so in string contexts (e.g., String(account)), "123-456" is returned.
// valueOf returns balance, so in numeric contexts (e.g., account + 500), it uses the balance value in 
// arithmetic operations, resulting in 1500.


// How JavaScript Determines Which Method to Call
// JavaScript uses type coercion rules to decide when to call toString or valueOf:

// In string contexts (e.g., String(account) or template literals like `${account}`),
// it calls toString to get the string representation.
// In numeric contexts (e.g., account + 500), JavaScript attempts to call valueOf to get a number.
// If valueOf returns a non-primitive or unexpected type, JavaScript falls back to toString.

// Improved Version with Type Checking
// To avoid potential issues with unexpected types, we can improve the methods by explicitly
//  returning types from toString and valueOf. Here’s how to ensure that toString always
//  returns a string and valueOf always returns a number:


const account2 = {
  accountNumber: "123-456",
  balance: 1000,

  toString() {
    // Ensure it always returns a string
    return String(this.accountNumber);
  },

  valueOf() {
    // Ensure it always returns a number
    return Number(this.balance);
  }
};

// Test cases
console.log(String(account2)); // "123-456" (calls toString explicitly)
console.log(account2 + 500);   // 1500 (uses valueOf in a numeric context)
console.log(`${account2}`);    // "123-456" (uses toString in a template literal)
console.log(account2 * 2);     // 2000 (uses valueOf in a numeric context)

// Explanation with Explicit Type Coercion
// String(account): Calls toString, ensuring the output is "123-456".
// account + 500: Calls valueOf due to the addition with a number, returning 1500.
// ${account}: Template literals use toString, so this outputs "123-456".
// account * 2: Calls valueOf in the numeric multiplication, resulting in 2000.
// Defensive Coding
// Adding explicit type coercions within toString and valueOf ensures consistent and predictable behavior, so you don’t need to worry about the JavaScript engine's specific behavior. This approach guarantees:

// toString always returns a string.
// valueOf always returns a number.
// With this structure, account can be used reliably in different contexts without surprises or unintended behavior.