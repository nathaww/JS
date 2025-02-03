// Both debounce and throttle are techniques used to control the rate at which a function is executed,
//  typically in response to events like scrolling, resizing, key presses, or API calls.
// They help optimize performance by reducing unnecessary function calls.

// 1. Debounce
// Debouncing ensures that a function is executed only after a specified delay has
//  passed since the last time it was invoked. If the event is triggered again within the delay period,
//  the timer resets.

// Use Case:
// Search input fields (e.g., triggering an API call only after the user stops typing)
// Resizing events (e.g., firing a layout recalculation only after resizing stops)
// Implementation

// function debounce(func, delay) {
//   let timeoutId;

//   return function (...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// }

// // Example: Debounce API call for input
// const searchInput = document.getElementById("search");

// const handleSearch = debounce((event) => {
//   console.log("Fetching search results for:", event.target.value);
// }, 500);

// searchInput.addEventListener("input", handleSearch);

// Behavior:
// If the user types continuously, the function will only execute once 500ms after they stop typing.

// 2. Throttle
// Throttling ensures that a function is executed at most once in a given interval,
// regardless of how many times the event is triggered.

// Use Case:
// Scroll events (e.g., infinite scrolling, triggering animations)
// Button click events (e.g., preventing multiple form submissions)
// Window resizing (e.g., recalculating layout at a fixed rate)
// Implementation

// function throttle(func, limit) {
//   let lastExecuted = 0;

//   return function (...args) {
//     const now = Date.now();

//     if (now - lastExecuted >= limit) {
//       func(...args);
//       lastExecuted = now;
//     }
//   };
// }

// // Example: Throttle window scroll event
// const handleScroll = throttle(() => {
//   console.log("Scroll event triggered:", new Date().toLocaleTimeString());
// }, 1000);

// window.addEventListener("scroll", handleScroll);

// Behavior:
// Even if the user scrolls rapidly, the function will execute at most once every 1000ms (1 second).

// Key Differences:
// Feature                  Debounce	                                            Throttle
// Execution                Timing	After the event stops	                        At regular intervals
// Frequency of Execution	Once, after the delay	                                At most once per interval
// Best Used For	        Input fields, resize events, search	                    Scroll, mouse movements, API rate limiting
// Example Analogy	        "I'll wait until you're done talking before replying."	"I'll reply, but only once every few seconds."

// When to Use What?
// Debounce: Use when you want to wait until the user stops performing an action.
// Throttle: Use when you need to limit the number of times a function runs within a time frame.

function Throttle(func, wait = 0) {
  let shouldRun = true;

  return function (...args) {
    if (!shouldRun) {
      return;
    }

    shouldRun = false;

    setTimeout(function () {
      shouldRun = true;
    }, wait);

    func.apply(this, args);
  };
}


function clg(){
  console.log("hiiii")
}

Throttle(clg(), 4000)
Throttle(clg(), 4000)
Throttle(clg(), 4000)
Throttle(clg(), 4000)
Throttle(clg(), 4000)