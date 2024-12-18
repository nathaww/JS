/* 
Thread of Execution and The Call Stack 
- Javascript is a single-threaded language
- It has one main thread that executes the code sequentially
- Thread is a single sequential flow of control
- Javascript is a synchronous language with asynchronous capabilities
- A thread has a call stack & memory

The Call Stack 
- Stack of functions to be executed
- Manages execution contexts
- Managed by the engine
- Each function is pushed to the stack and popped when it's done
- LIFO (Last In First Out) data structure

The Execution Context
- Is an abstract concept that represents the environment in which a particular piece of 
  JavaScript code is evaluated and executed.
  It determines what variables, functions, and objects are accessible at any given point in the code.

What Does the Execution Context Do?
- Sets the Environment for Code Execution:
  Determines how the code is interpreted and which variables and functions are available.

- Handles Scope and Closures:
  Manages the scope chain and ensures that variables are resolved from the correct scope.

- Manages this:
  Assigns the value of this based on how the function is called.


Types of Execution Context

1. Global Execution Context:
  Created when the JavaScript program starts running.
  Associated with the global object (window in browsers, global in Node.js).
  Contains:
    Global variables.
    Global functions.

2. Function Execution Context:
  Created when a function is called.
  Contains:
    The function’s arguments and parameters.
    Local variables and functions declared within the function.
    References to the outer environment (closure).

3. Eval Execution Context:
  Created when eval() is invoked to execute code as a string.



Execution Context Phases
- Creation Phase
    - Global object is created
    - Create this keyword and bind it to the global object
    - Setup memory space for variables and functions
    - Store functions and variables in global execution context and set to "undefined"

- Execution Phase
    - Code is executed line by line
    - Create a new execution context for each function call
    - If the function doesn't return a value, it returns "undefined" by default

What Does the Execution Context Contain?

- Variable Environment:
  Contains all variables, function declarations, and the arguments object (in case of a function).
  This is created during the creation phase of the execution context.

- Lexical Environment:
  Contains:
    Local environment (variables declared inside the current block or function).
    Reference to the parent (outer) lexical environment.

- this Binding:
  The value of this depends on how the function is called:
  Global context: this refers to the global object.
  Inside a function: this depends on the calling object.
  Arrow functions: this is lexically inherited from the parent scope.

- Scope Chain:
  Used to resolve variable references.
  Combines the current lexical environment with the outer lexical environments.

- Realm:
  A realm is a conceptual environment that includes:
  A global object.
  Built-in objects (e.g., Array, Object).
  Global code (e.g., the window object in browsers).
  Each realm has its own execution context and is often associated with iframes or
  different JavaScript virtual machines.

Hoisting
- Hoisting is the behavior of moving the variables and function declarations to the top of their respective
  scope during compilation phase, variables are partially hoisted and function declaration are hoisted
- Variable & function declarations are moved to the top of their respective environments during the creation phase
- Function declarations are hoisted, variables are not hoisted

A Realm in JavaScript is an abstract concept defined in the ECMAScript specification. 
It is essentially an environment where JavaScript code runs. Each realm has its own set 
of built-in objects (e.g., Array, Object), a global object (e.g., window or global), and an execution environment.

Let’s break down the components of a realm, including the key concepts you mentioned, and how they interconnect.

1. Realm Record
A Realm Record is the fundamental representation of a realm in JavaScript. It contains all the information
 required to execute code within that realm. Key components of a realm record are:

Intrinsics: The set of built-in objects and functions for the realm, 
such as Object, Array, Function, Map, etc. Each realm has its own copy of intrinsics.

Global Object: The object that serves as the global scope for the realm. 
It contains built-in properties, user-defined properties, and host-defined properties.

Global Environment Record: Represents the scope of the global object, 
handling variable bindings and function declarations in the global scope.

2. Intrinsics
Intrinsics are the default built-in objects and functions provided by JavaScript,
 like Array, Object, Function, etc.
Each realm has its own intrinsics. For example, if you create a new iframe in a browser, 
it will have its own Array object distinct from the main window’s Array.
How Intrinsics Work:
Intrinsics ensure that code in one realm doesn’t share built-in objects with another realm, 
which is crucial for maintaining isolation between realms.
They are initialized during the creation of a realm and stored as part of the realm record.

3. Global Object
The global object is the top-level object in a realm and is accessible via window (in browsers)
 or global (in Node.js).
It contains:
Specification (Spec) Properties: Defined by the ECMAScript specification (e.g., Object, Array, setTimeout).
User Properties: Added by user-defined scripts (e.g., var myGlobal = 42).
Host Properties: Defined by the host environment (e.g., window.alert in browsers, process in Node.js).
Global Object Example:
javascript
Copy code
// In a browser
console.log(window.setTimeout === setTimeout); // true
console.log(window.myGlobal = "hello");       // Adds a user property

4. Spec, User, and Host Properties
Spec Properties:
Defined by the ECMAScript standard, such as Object, Math, Date.
Immutable and consistent across realms.
User Properties:
Defined by user code, such as variables or functions attached to the global object.
These are mutable and can be deleted by the user.
Host Properties:
Defined by the host environment, such as window.location or document in browsers.
These are provided by the runtime and vary depending on the environment (browser, Node.js, etc.).
5. Global Environment Record
The Global Environment Record is the abstract representation of the global scope. 
It manages the bindings for global variables and functions.

Binding Object:

Maps variables and functions to the global object.
For example, var x = 10; creates a binding x on the global object.
Declarative Record:

Holds bindings that are not properties of the global object, such as let and const variables.
How They Work Together:
var creates bindings on the global object (binding object).
let and const are stored in the declarative record and are not added as properties of the global object.
javascript
Copy code
var globalVar = 10;
let blockScopedVar = 20;

console.log(window.globalVar);    // 10
console.log(window.blockScopedVar); // undefined
6. Global this Value
In the global context, this refers to the global object.
In browsers: this === window.
In Node.js: this === global.
javascript
Copy code
console.log(this === window); // true (in browsers)
Within strict mode ('use strict'), the global this is undefined in functions unless explicitly bound.
7. Outer Environment
The Outer Environment is the parent lexical environment for a given execution context.
 In the global execution context, the outer environment is null.

Functions created within the global scope will have the global environment as their outer environment.
Closures retain a reference to their outer environment.
javascript
Copy code
function outer() {
  let outerVar = 'I am outer';

  function inner() {
    console.log(outerVar); // Accesses the outer environment
  }

  inner();
}

outer();
How They Work Together
Realm Record initializes a new environment with its own intrinsics, global object, and global environment record.
Intrinsics provide the default functionality for the realm.
Global Object is the root object that stores properties and variables accessible globally.
Global Environment Record manages variable and function bindings in the global scope.
Spec, User, and Host Properties populate the global object with default properties,
user-defined properties, and host environment features.
Global this Value determines the value of this in the global execution context.
Outer Environment links the global environment to child execution contexts, 
enabling variable resolution through the scope chain.
Visualization
plaintext
Copy code
Realm
├── Intrinsics (e.g., Object, Array, Function)
├── Global Object (e.g., window, global)
│   ├── Spec Properties (e.g., Math, Date)
│   ├── Host Properties (e.g., setTimeout, document)
│   ├── User Properties (e.g., custom global variables)
├── Global Environment Record
│   ├── Binding Object (e.g., var variables)
│   ├── Declarative Record (e.g., let, const variables)
└── Outer Environment (links to the parent lexical environment)
This structure ensures isolation between realms while supporting powerful scoping, closures, and global accessibility.

JS Engine 
- Parser
- Interpreter 
- JIT
*/
 

// console.log(name) //Throws reference error 
// let name = "John";


// console.log(0 == false);
// console.log("" == false);
// console.log([] == false);
// console.log(!-1 === false);



// engines 
// V8 - Chrome, spidermonkey - mozilla, JSC - Safari, Chakra - edge 