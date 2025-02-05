// Understanding Classes in JavaScript (ES6+)
// A class in JavaScript is a blueprint for creating objects. 
// It encapsulates data (properties) and behaviors (methods) related to a specific entity. 
// JavaScript classes were introduced in ES6 (ECMAScript 2015) as syntactical sugar over 
// the prototype-based inheritance system.

// How Classes Work in JavaScript
// Classes are defined using the class keyword.
// A class can have a constructor, which initializes object properties.
// Methods inside a class are added to the prototype.
// A class can extend another class using extends (inheritance).
// The super keyword is used to call the parent class's constructor and methods.
// Classes can have static methods that belong to the class itself, not instances.

// General Topics on JavaScript Classes
// Class Syntax & Constructor
// Instance vs. Static Methods
// Inheritance (extends, super)
// Encapsulation (#privateFields, closures)
// Method Overriding & Polymorphism
// Prototype Chain & Class Internals
// Mixins and Multiple Inheritance
// Memory Management & Performance Optimization
// Class Expressions & Anonymous Classes
// Metaprogramming with Classes (Reflect, Proxy, Decorators)

// Silicon Valley-Level Hard JavaScript Class Questions
// 1. What will be the output of the following code?
class Parent {
  constructor() {
    this.value = 42;
  }

  static show() {
    return this.value;
  }
}

class Child extends Parent {}

console.log(Child.show());
// Answer:
// undefined.

// show() is a static method, meaning it belongs to the class itself, not instances.
// this.value inside show() refers to Parent.value, which doesn’t exist.
// Since Child inherits show(), calling Child.show() doesn’t set value on the class itself.
// 2. How does JavaScript implement private fields in classes?
// Answer:
// JavaScript uses # as a prefix for private fields.

class User {
  #password;
  
  constructor(password) {
    this.#password = password;
  }

  getPassword() {
    return this.#password;
  }
}

const user = new User("secret");
console.log(user.getPassword()); // secret
// console.log(user.#password); // SyntaxError: Private field '#password' must be declared
// Private fields cannot be accessed outside the class.
// Trying user.#password directly results in a SyntaxError.
// 3. What will be the output of the following class method chaining example?
class Chain {
  constructor(val) {
    this.val = val;
  }
  
  add(num) {
    this.val += num;
    return this;
  }
  
  multiply(num) {
    this.val *= num;
    return this;
  }
}

const result = new Chain(2).add(3).multiply(4).val;
console.log(result);
// Answer:
// 20.

// add(3) → 2 + 3 = 5
// multiply(4) → 5 * 4 = 20
// Method chaining works because each method returns this.
// 4. How would you implement multiple inheritance in JavaScript, since JS classes support single inheritance?
// Answer:
// JavaScript doesn’t support multiple inheritance, but we can use mixins:

const MixinA = Base => class extends Base {
  methodA() { console.log("MixinA methodA"); }
};

const MixinB = Base => class extends Base {
  methodB() { console.log("MixinB methodB"); }
};

class Base {}

class Derived extends MixinA(MixinB(Base)) {}

const obj = new Derived();
obj.methodA(); // MixinA methodA
obj.methodB(); // MixinB methodB

// MixinA and MixinB extend Base, and Derived extends the modified base class.
// This simulates multiple inheritance.
// 5. Explain the difference between class expressions and class declarations.
// Answer:
// Class Declaration (Named):

class Person {
  constructor(name) { this.name = name; }
}
// Hoisted but not initialized (unlike function declarations).
// Class Expression (Anonymous or Named):

const Person = class {
  constructor(name) { this.name = name; }
};
// Not hoisted.
// Useful for conditional definitions.
// 6. What will be the output of the following code?

class A {
  static x = 10;
  static {
    this.x += 5;
  }
}

console.log(A.x);
Answer:
15.

// Static fields can be initialized with static {} blocks in JavaScript.
// this.x += 5 modifies x to 10 + 5 = 15.
// 7. What happens if you call a class without new in JavaScript?
// Answer:
class Demo {
  constructor() {
    console.log("Constructor called");
  }
}

Demo(); // TypeError: Class constructor Demo cannot be invoked without 'new'
// JavaScript enforces that classes must be instantiated using new.
// 8. How do you create a singleton class in JavaScript?
// Answer:
// A singleton ensures only one instance exists:
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}

const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
// The first instance is stored in Singleton.instance, and subsequent calls return the same instance.
// 9. How can you prevent a class from being extended in JavaScript?
// Answer:
// Using Object.freeze():

class FinalClass {
  constructor() { console.log("Cannot be extended"); }
}
Object.freeze(FinalClass.prototype);

class Attempt extends FinalClass {} // TypeError: Attempt cannot extend a frozen object
// Freezing the prototype prevents new methods from being added or overridden.
// 10. How does method overriding work in JavaScript classes?
// Answer:
class Parent {
  greet() {
    console.log("Hello from Parent");
  }
}

class Child extends Parent {
  greet() {
    super.greet();
    console.log("Hello from Child");
  }
}

new Child().greet();
Output:

csharp

// Hello from Parent
// Hello from Child
// super.greet() calls the parent method before the child method executes.
// This is method overriding.
// Conclusion
// JavaScript classes abstract away prototype-based inheritance.
// Static properties/methods belong to the class, not instances.
// Encapsulation can be enforced using #privateFields.
// Method chaining enables functional-style coding.
// Multiple inheritance is simulated with mixins.
// Singletons prevent multiple instances.
// Method overriding allows subclass customization.