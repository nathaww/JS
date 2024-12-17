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
- Environment where the code is executed and variable & function access
- Contains the code that's currently running
- Contains the reference to the outer environment
- There is a global execution context (default) as well as function execution context for every function invoked
- Global Execution Context contains Global object (window) and this keyword
- window === this true

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

Hoisting
- Hoisting is the behavior of moving the variables and function declarations to the top of their respective
  scope during compilation phase, variables are partially hoisted and function declaration are hoisted
- Variable & function declarations are moved to the top of their respective environments during the creation phase
- Function declarations are hoisted, variables are not hoisted


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