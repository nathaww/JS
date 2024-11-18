/*
 - The functionalities of a webpage are divided into smaller segments 
 - Web component is a newer way for web development
    1. Code becomes more manageable 
    2. Development becomes easy (developers working on a single page but different components)
    3. Maintenance / Error handling becomes more specific to a component
    4. Less development time 
    5. Reusability
    6. No dependencies Javascript is enough  
 */

// class ProductCard extends HTMLElement {
//   constructor() {
//     super();
//     this.innerHtml = "Product Component";
//   }
// }
// customElements.define("product-card", ProductCard);

/*
When creating web components they should be segregated into their own scope or it might cause 
styling clash 
To solve this we use Shadow DOM
- Shadow DOM is a way to provide encapsulation to the web components
- Its a way to provide separate hidden DOM to web components 
*/

// class ProductCard extends HTMLElement {
//   constructor() {
//     super();
//     const h1 = document.createElement("h1");

//     h1.innerHtml = `
//         <style>
//             h1{
//             color: red
//             }
//         </style>
//     Product Component`;

//     this.attachShadow({mode: "open"}) //open means the current page can access the shadow DOM via JS, closed will return null
//     this.shadowRoot.appendChild(h1)
// }
// }

// customElements.define("product-card", ProductCard);

/*
<template />

The <template> tag is used as a container to hold some HTML content hidden from the user when the page loads.

The content inside <template> can be rendered later with a JavaScript.
*/

// const template = `
//     <div>
//         <img />
//         <h3></h3>
//         <p></p>
//         <button>Buy</button>
//     </div>
// `
// class ProductCard extends HTMLElement {
//   constructor() {
//     super();

//     this.attachShadow({mode: "open"})
//     this.shadowRoot.appendChild(template.content.cloneNode(true));
//     this.shadowRoot.querySelector('h3').innerText(this.getAttribute('pName')) // get attributes from html
// }
// }

// customElements.define("product-card", ProductCard);

/*
connectedCallback()
 - Is called when a custom element is connected to the DOM
 
disconnectedCallback()
 - Is called when a custom element is disconnected/removed from the DOM

adoptedCallback()
 - Is called when a component is moved to a new page/DOM
 - Rarely used

attributeChangedCallback()
 - Is executed when there is a change in attribute (add, remove or modify)
*/

const template2 = document.createElement("template");
template2.innerHTML = `
    <div>
        <img />
        <h3></h3>
        <p></p>
        <button>Buy</button>
        <button id="trash">Delete</button>
    </div>
`;
class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template2.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("pname"); // get attributes from html
    this.shadowRoot.querySelector("p").innerText = this.getAttribute("pstatus"); // get attributes from html
  }

  connectedCallback() {
    this.shadowRoot.querySelector("button").onclick = () => {
      // this.shadowRoot.querySelector('p').innerText = "Sold" // this works but this doesn't change the attribute
      this.pstatus = "Sold";
    };

    this.shadowRoot.getElementById("trash").addEventListener("click", () => {
      this.remove();
    });
  }

  set pstatus(value) {
    this.setAttribute("pstatus", value);
  }

  static get observedAttributes() {
    // This method returns an array of attributes which you want to keep watch on
    return ["pstatus"]; // specify which attribute we want to observe
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    // to prevent unnessceray update we can compare the old and new value and only update if there is a difference
    if (oldVal !== newVal) {
      this.shadowRoot.querySelector("p").innerText = newVal;
    }
  }

  disconnectedCallback() {
    this.shadowRoot
      .getElementById("trash")
      .removeEventListener("click", () => {});
  }
}

customElements.define("product-card", ProductCard);

/*
Slot 
- In the context of Web Components, a slot is a special feature provided by the Shadow DOM to allow 
developers to define placeholders inside a custom element's shadow tree where
 external content (from the light DOM) can be projected or inserted.
*/

// Default Content for Slots
// If no content is provided in the light DOM, you can define default content for the slot.

// Example

class MyComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <div>
        <slot>Default content goes here</slot>
      </div>
    `;
  }
}
customElements.define("my-component", MyComponent); 

// Using the Component

{
  /* <my-component>
</my-component> */
}

// Rendered Output
// If no content is provided, the default content will appear:

{/* <my-component>
  #shadow-root
  <div>Default content goes here</div>
</my-component>; */}

// Key Features of Slots
// Content Projection: Slots allow light DOM content to be inserted into specific placeholders in the shadow DOM.
// Named Slots: You can use the name attribute on slot to target specific light DOM elements for projection.
// Default Content: Define fallback content for a slot that is displayed if no light DOM content is provided.
// Use Cases
// Creating reusable components that allow customization.
// Designing components like modal dialogs, tabs, 
// or carousels where users can insert their own content into predefined areas.
