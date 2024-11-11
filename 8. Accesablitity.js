// Color blind
// Blur
// Grayscale
// Visual Impairments

// 1. aria-label
// Purpose: Provides a text label for an element (like an icon) that doesn’t have visible text, allowing screen readers to announce the label.
// Usage Example: <button aria-label="Close">×</button>
{
  /* <button aria-label="Close">
  <span aria-hidden="true">×</span> <!-- Icon only, hidden from screen readers -->
</button> */
}

// 2. aria-labelledby
// Purpose: Links an element to another element containing a label, enabling screen readers to read the linked label.
// Usage Example: <button aria-labelledby="label-id">Button</button>
{
  /* <div>
  <span id="modal-title">My Modal Title</span>
  <button aria-labelledby="modal-title close-label">
    <span id="close-label" class="visually-hidden">Close</span> <!-- Hidden from view but readable by screen readers -->
    <span aria-hidden="true">×</span>
  </button></div>
  The screen reader will read "My Modal Title Close" (#modal-title + #close-label)
  */

}

// 3. aria-hidden
// Purpose: Hides an element from screen readers without removing it visually, often used when a part of the UI isn’t relevant for accessibility.
// Values: true or false
// Usage Example: <span aria-hidden="true">Icon</span>

// 4. role
// Purpose: Defines the role of an element for assistive technologies, which helps them understand the function or structure of an element.
// Examples:
// button, alert, banner, dialog, navigation, etc.
// Usage Example: <div role="navigation">Menu</div>

// 5. aria-live
// Purpose: Announces dynamic content changes to screen readers. Useful for live regions like notifications or form validation messages.
// Values: off, polite, assertive
// Usage Example: <div aria-live="polite">Content updated</div>

// 6. aria-current
// Purpose: Indicates the current item within a set of elements, like a menu or a carousel.
// Values: page, step, location, date, etc.
// Usage Example: <li aria-current="page">Home</li>

// 7. aria-controls
// Purpose: Links an element to another element it controls, commonly used in expandable sections like accordions.
// Usage Example: <button aria-controls="section1">Expand</button>
// Expand button controls the expandable state of section1

// 8. aria-expanded
// Purpose: Indicates whether an element is expanded or collapsed, commonly used with dropdowns or expandable menus.
// Values: true or false
// Usage Example: <button aria-expanded="true">Menu</button>

// 9. aria-describedby
// Purpose: Points to an element that provides additional descriptive information, often used for tooltips or detailed explanations.
// Usage Example: <input aria-describedby="desc" /> <span id="desc">Additional info</span>

// 10. tabindex
// Purpose: Controls the order in which elements receive focus when navigating with the Tab key.
// Values: 0 (natural order), -1 (removes from tab order), or any positive integer.
// Usage Example: <div tabindex="0">Focusable element</div>

// 11. aria-checked
// Purpose: Indicates the checked state of an interactive element like a checkbox or switch.
// Values: true, false, or mixed
// Usage Example: <div role="checkbox" aria-checked="true"></div>

// 12. datetime (used in <time> tags)
// Purpose: Provides a machine-readable date and time, making it easier for screen readers and bots to interpret.
// Usage Example: <time datetime="2023-04-20">April 20, 2023</time>

// 13. aria-role
// Purpose: Assigns specific roles to elements to specify their semantic purpose.
// Common roles: alert, banner, dialog, contentinfo, main, complementary, etc.
