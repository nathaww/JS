// DOM vs BOM
console.log(window.innerHeight);
console.log(window.innerWidth);
console.log(screen.width);
console.log(screen.height);
console.log(window.location);

// event bubbling and capturing
// bubbling is when the propagation path is from bottom to top (lowest child to ancestor)
// capturing is when the propagation path is from top to bottom

// by default, event bubbling is used
// we can change it to capturing by setting the third parameter of addEventListener to true
// we can stop the propagation of an event by calling event.stopPropagation()
// we can prevent the default behavior of an event by calling event.preventDefault()

// event delegation
// we can attach an event listener to a parent element and then check if the event target
// matches the selector we want
// this is more efficient than attaching an event listener to each child element
// we can use event.target to get the element that triggered the event
// we can use event.currentTarget to get the element that the event listener is attached to

event.target & event.currentTarget
// event.target is the element that triggered the event
// event.currentTarget is the element that the event listener is attached to

// event delegation example
document.getElementById("parent").addEventListener("click", function (event) {
  if (event.target.matches(".child")) {
    console.log("child clicked");
  }
});

// stopPropagation and preventDefault
document.getElementById("child").addEventListener("click", function (event) {
  console.log("child clicked");
  event.stopPropagation();
  event.preventDefault();
});

document.body.append()
// Usage: Can accept multiple arguments, allowing you to append several nodes or text strings at once.
// Content: Can append both DOM nodes and text directly.
// Return Value: Returns undefined.
// Example:

document.body.append("Hello, ", "world!"); // Appends text directly
document.body.append(document.createElement("div"), "Text"); // Appends a div and text at once
// Benefits:
// Simplifies appending both text and nodes.
// Ideal for scenarios where you need to append multiple elements or text fragments.

 document.body.appendChild()
// Usage: Accepts only a single DOM node as an argument.
// Content: Cannot append text directly. Only works with a single node.
// Return Value: Returns the appended child node.
// Example:

const div = document.createElement("div");
document.body.appendChild(div); // Appends the div element


// Question 1: Write a JavaScript function that attaches a custom event to an element with a given ID.
// The function should fire the custom event when the element is clicked, but it should not propagate
// the event further up the DOM tree.

// Additionally, write another function that listens for this custom event on the parent of this element and
// logs a message only if the event bubbles to the parent (which should not happen).

const btn = document.getElementById("boxBtn");
const box1 = document.getElementById("boxBtn");

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("button clicked");

  const customEvent = new CustomEvent("buttonClicked", {
    bubbles: false,
    detail: { message: "This is a custom event" },
  });

  btn.dispatchEvent(customEvent);
});

box1.addEventListener("buttonClicked", (e) => {
  console.log("box clicked", e.detail.message);
});

document.addEventListener("click", () => {
  console.log("Document clicked");
});

// Question 2: Write a function findAndModifyElementByClass(rootElement, targetClass, newText)
// that searches a deeply nested DOM structure to find the first element
// with a specific class name starting from a specified root element.

// Once found:

// - Change the inner text of the found element to newText.
// - If no element is found with the target class, return "Element not found".

const findAndModifyElementByClass = (rootElement, targetClass, newText) => {
  if (rootElement && rootElement.classList.contains(targetClass)) {
    rootElement.innerText = newText;

    return rootElement;
  }

  for (let child of rootElement) {
    const found = findAndModifyElementByClass(child, targetClass, newText);
    return found ? found : null;
  }

  return null;
};

const rootElement = document.querySelector(".container");
const result = findAndModifyElementByClass(rootElement, "box2", "New Text");
if (!result) {
  console.log("Element not found");
} else {
  console.log("Element modified:", result);
}

// Question 3: You have a structure with multiple nested lists of items, such as:

// html
// <ul id="mainList">
//   <li>Item 1
//     <ul>
//       <li>Item 1.1</li>
//       <li>Item 1.2
//         <ul>
//           <li>Item 1.2.1</li>
//         </ul>
//       </li>
//     </ul>
//   </li>
//   <li>Item 2</li>
// </ul>
// Write a function that adds an event listener on each list item (<li>) such that:

// When any list item is clicked, it logs the path from the main list (<ul id="mainList">) down to the clicked item.
// This should work dynamically with any depth of nested lists, so adding more nested lists in the HTML should still result in the correct path being logged.
// Requirements:

// Use event delegation efficiently.
// Log the correct path of clicked elements regardless of list depth.

const mainLIst = document.getElementById("mainList");

mainLIst.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    const path = [];
    let currentTarget = e.target;
    while (currentTarget && currentTarget != mainLIst) {
      path.unshift(currentTarget.textContent.trim());
      currentTarget = currentTarget.parentElement.closest("li");
    }

    path.unshift("main list");

    console.log(path.join(">"));
  }
});

// Question: Assume you have a dynamic application that frequently adds and removes DOM elements.
// Every second, an element is created, an event listener is attached to it, and it’s appended to the DOM.
// Another element is removed from the DOM at the same interval.

// Write code that:

// Adds a new element with an event listener every second.
// Removes an element every second.
// Ensures there are no memory leaks as elements are frequently added and removed from the DOM.
// Requirements:

// Efficiently manage event listeners to prevent memory leaks.
// Clean up DOM elements and event listeners properly when they are removed.
// Hints:

// Use concepts like WeakMap for tracking elements, and ensure removed elements don’t
// leave behind dangling  references or event listeners.

const container = document.createElement("div");
document.body.appendChild(container);

const MAX_ELEMENTS = 5;
const element = [];

const addRemoveElement = () => {
  const newElement = document.createElement("div");
  newElement.textContent = `New div ${element.length + 1}`;

  const handleClick = () => {
    console.log("new element click", element);
  };

  newElement.addEventListener("click", handleClick);

  container.appendChild(newElement);
  element.push({ element: newElement, handleClick });

  if (element.length > MAX_ELEMENTS) {
    const oldest = element.shift();

    oldest.element.removeEventListener("click", oldest.handleClick);
    container.removeChild(oldest.element);
  }
};

setInterval(addRemoveElement, 1000);



// Question: Write a function that takes a DOM node and a depth number,
//  then recursively clones this node and all its child nodes up to the specified depth.

// For each cloned node:

// Append it to the document after the original node.
// Modify the id attribute of each cloned node by appending _clone to avoid ID conflicts.
// Change the text color of the cloned elements to differentiate them from the original ones.
// Requirements:

// The function should use cloneNode and modify the cloned structure without affecting the original nodes.
// Avoid conflicts with existing id attributes by renaming them for each clone.
// Hints:

// Use recursion carefully with cloneNode to manage depth.
// Make sure to apply changes only to cloned nodes, not the original DOM structure.

const cloneNodeWithDepth = (node, depth) => {
  // Base case: if depth is 0, return without cloning
  if (depth === 0) return;

  // Clone the current node, including its children
  const clone = node.cloneNode(true);

  // Modify the cloned node's id to avoid conflicts, if it has one
  if (clone.id) {
      clone.id += "_clone";
  }

  // Change the text color of the cloned element
  clone.style.color = "blue"; // Change color to differentiate

  // Insert the clone after the original node
  node.parentNode.insertBefore(clone, node.nextSibling);

  // Recursively clone child nodes up to the specified depth
  for (let i = 0; i < node.children.length; i++) {
      // Limit recursion to the depth
      cloneNodeWithDepth(node.children[i], depth - 1);
  }
};

// Example usage:
const rootNode = document.querySelector("#container");
cloneNodeWithDepth(rootNode, 2); // Clones rootNode and up to 2 levels of children

// const realDOM = document.getElementById("realDOM");
// const cloneBtn = document.getElementById("cloneBtn");

// cloneBtn.addEventListener("click", () => {
//   const fakeDOM = realDOM.cloneNode(true);

//   fakeDOM.style.background = "red";
//   fakeDOM.style.color = "blue";

//   document.body.append(fakeDOM);
// });

// 1. Event Propagation (Bubbling and Capturing)
// Question: Explain the difference between event bubbling and event capturing in the DOM. How can you stop event propagation?

// What It's Testing: This tests your understanding of the event flow in the DOM, particularly how events are propagated through the DOM tree.

// Expected Answer:

// Bubbling: The event starts from the target element and bubbles up to the root (document).
// Capturing: The event starts from the root and propagates down to the target element.
// Stopping propagation: You can stop propagation using event.stopPropagation() in the event handler. To prevent both bubbling and capturing, use event.stopImmediatePropagation().
// 2. DOM Manipulation Performance
// Question: If you need to update a large number of DOM elements dynamically, what is the most efficient way to do it?

// What It's Testing: This checks your ability to optimize DOM manipulations, which can be costly if done inefficiently.

// Expected Answer:

// Use Document Fragments: A DocumentFragment allows you to make changes off-screen and then append them to the DOM in one go.
// Batch Updates: Rather than updating the DOM element by element, batch your changes and update them all at once.
// Avoid Reflows/Repaints: Minimize layout thrashing by making all DOM updates in a way that doesn’t trigger unnecessary reflows.
// 3. Querying the DOM Efficiently
// Question: What are the differences between getElementById(), querySelector(), and querySelectorAll()? Which one would you use in a specific case and why?

// What It's Testing: This tests your knowledge of DOM querying methods and their performance implications.

// Expected Answer:

// getElementById(): Selects a single element by ID, most efficient if you know the ID.
// querySelector(): Selects the first element that matches the given CSS selector, slower than getElementById() but more flexible.
// querySelectorAll(): Returns a NodeList of all elements that match the selector. It's useful when you need to select multiple elements.
// When to use: Use getElementById() for fast single element selection by ID. Use querySelector() and querySelectorAll() when you need more flexible CSS selector-based querying.
// 4. Handling Dynamic DOM Changes
// Question: How do you handle DOM changes in a page when elements are dynamically added or removed? What is the best approach to listening to events for these dynamic elements?

// What It's Testing: This tests your understanding of dynamically changing content and event delegation.

// Expected Answer:

// Event Delegation: Attach event listeners to a parent element that already exists in the DOM. The listener will catch events on child elements, even if those child elements are added later.
// MutationObserver: You can use the MutationObserver API to detect changes in the DOM, such as added or removed elements, and respond to those changes programmatically.
// 5. Deep vs Shallow Cloning
// Question: What is the difference between deep and shallow cloning of a DOM node? When would you use each?

// What It's Testing: This checks your understanding of how cloning works in JavaScript and its impact on the DOM.

// Expected Answer:

// Shallow Clone: A shallow clone (cloneNode(false)) copies only the element itself, not its children.
// Deep Clone: A deep clone (cloneNode(true)) copies the element along with all its children.
// When to use: Use shallow cloning when you don't need to duplicate child nodes. Use deep cloning when you need a full copy of the node and its entire subtree.
// 6. Debouncing and Throttling DOM Events
// Question: What are debouncing and throttling? How would you implement them in response to DOM events like scroll or resize?

// What It's Testing: This tests your knowledge of performance optimization for events that can be triggered very frequently.

// Expected Answer:

// Debouncing: Ensures that a function is only executed after a certain delay when the event stops firing. Useful for events like typing or resizing where you only want to handle the final event after a burst of activity.
// Throttling: Limits the execution of a function to once every specified interval. This is useful for events that fire repeatedly, like scroll or resize, to reduce unnecessary executions.
// Implementation:
// javascript
// Copy code
// // Debouncing example
// const debounce = (func, delay) => {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };

// // Throttling example
// const throttle = (func, interval) => {
//   let lastTime = 0;
//   return function (...args) {
//     const now = new Date().getTime();
//     if (now - lastTime >= interval) {
//       lastTime = now;
//       func(...args);
//     }
//   };
// };
// 7. Accessing and Modifying Attributes
// Question: How do you modify the src or href attributes of an image or link element using JavaScript?

// What It's Testing: This tests your basic DOM manipulation skills related to element attributes.

// Expected Answer:

// You can access and modify the src or href attribute using getAttribute() and setAttribute().
// Example:
// javascript
// Copy code
// // Modifying src of an img element
// const img = document.getElementById("myImage");
img.src = "new-image.jpg"; // or img.setAttribute("src", "new-image.jpg");

// // Modifying href of a link
// const link = document.getElementById("myLink");
link.href = "https://new-url.com"; // or link.setAttribute("href", "https://new-url.com");
// 8. DOM Manipulation with Templates
// Question: How do you use <template> in the DOM, and when is it useful?

// What It's Testing: This checks if you know how to use the <template> element for efficient DOM manipulation.

// Expected Answer:

// The <template> tag is a mechanism for holding HTML content that is not rendered immediately. 
// It’s useful for creating reusable fragments that can be added to the DOM at runtime.
// Example:
// html
// Copy code
// <template id="myTemplate">
//   <div class="item">New item</div>
// </template>

// <script>
//   const template = document.getElementById("myTemplate");
//   const clone = document.importNode(template.content, true); // Deep clone the template content
//   document.body.appendChild(clone); // Add it to the DOM
// </script>
// 9. Handling Forms and Validations
// Question: How do you interact with form elements in JavaScript? How do you validate a form before submitting?

// What It's Testing: This tests your ability to manipulate and validate forms using JavaScript.

// Expected Answer:

// You can access form elements using document.forms, getElementById(), or querySelector().
// To validate a form, you can listen for the submit event and use JavaScript to check input values before allowing submission.
// Example:
// javascript
// Copy code
// const form = document.getElementById("myForm");
// form.addEventListener("submit", (e) => {
//   const input = document.getElementById("username");
//   if (input.value === "") {
//     e.preventDefault();
//     alert("Username is required!");
//   }
// });
// 10. Handling Multiple Event Listeners
// Question: Can you attach multiple event listeners to the same DOM element? How do you remove one?

// What It's Testing: This checks your understanding of how multiple listeners interact and how to manage them.

// Expected Answer:

// Yes, you can attach multiple event listeners to the same element. Each listener will be executed in the order they were added.
// You can remove an event listener using removeEventListener() by passing the exact function reference used in addEventListener().
// Example:
// javascript
// Copy code
// const button = document.getElementById("myButton");

// const handleClick1 = () => console.log("First click handler");
// const handleClick2 = () => console.log("Second click handler");

// button.addEventListener("click", handleClick1);
// button.addEventListener("click", handleClick2);

// // To remove the first event listener
// button.removeEventListener("click", handleClick1);