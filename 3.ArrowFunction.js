// - new keyword doesn't work 
// - this keyword doesn't work 
// - arguments keyword doesn't work 

// A JavaScript IIFE (Immediately Invoked Function Expression) 
// is a function that runs the moment it is invoked or called in the JavaScript event loop.

// - IIFE
(function () {
  console.log("Hello World");
})();

//IIFE arrow function
(() => {
  console.log("Hello World");
})();