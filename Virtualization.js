// Virtualization in React
// Virtualization is an optimization technique in React (and frontend development in general) that 
// renders only the visible items in a list or grid instead of rendering the entire dataset at once. 
// This improves performance, especially for large datasets.

// Why Use Virtualization?
// Performance Boost – Rendering thousands of DOM elements can slow down the UI. Virtualization 
// reduces the number of DOM updates.
// Lower Memory Usage – Only a small portion of elements exist in the DOM at a time.
// Smooth Scrolling – Avoids UI freezes caused by excessive re-rendering.
// Popular Virtualization Libraries
// 1️⃣ React Window (Lightweight, recommended)

// npm install react-window
// Example with FixedSizeList:

import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

export default function MyVirtualizedList() {
  return (
    <List
      height={300}   // Height of the list container
      itemCount={1000} // Total items
      itemSize={50}   // Height of each row
      width={300}     // Width of the list container
    >
      {Row}
    </List>
  );
}
// Key Features:

// Supports fixed and variable item sizes (FixedSizeList, VariableSizeList).
// Works well for most use cases.
// 2️⃣ React Virtualized (More powerful but heavier)

// npm install react-virtualized

import { List } from "react-virtualized";

const rowRenderer = ({ key, index, style }) => (
  <div key={key} style={style}>
    Row {index}
  </div>
);

export default function MyVirtualizedList() {
  return (
    <List
      width={300}
      height={300}
      rowHeight={50}
      rowCount={1000}
      rowRenderer={rowRenderer}
    />
  );
}
// Key Features:

// More features like InfiniteLoader, AutoSizer, and Masonry.
// More customizable but slightly complex.
// 3️⃣ TanStack Virtual (formerly React Virtual) (Headless, highly optimized)

// npm install @tanstack/react-virtual

import { useVirtualizer } from "@tanstack/react-virtual";

export default function VirtualList() {
  const parentRef = React.useRef(null);
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Approx height of each row
  });

  return (
    <div ref={parentRef} style={{ height: 300, overflow: "auto" }}>
      <div style={{ height: rowVirtualizer.getTotalSize() }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: virtualRow.start,
              left: 0,
              right: 0,
              height: 50,
            }}
          >
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
// Key Features:

// Fully customizable and framework-agnostic.
// Best for advanced cases like dynamic heights and infinite scrolling.
// When to Use Virtualization?
// ✅ Large lists (e.g., social media feeds, search results).
// ✅ Infinite scrolling.
// ✅ Performance optimization for complex lists.

// 🚫 Not needed for small lists (less than 100 items).

// Which One to Choose?
// Library	Pros	Cons
// React Window	Lightweight, easy to use	Fixed-size items only (unless using VariableSizeList)
// React Virtualized	Feature-rich, supports autosizing, grids	Slightly heavier, complex API
// TanStack Virtual	Best performance, headless (full control)	Requires manual styling & setup
// Conclusion
// If you need quick, easy virtualization, use React Window.
// If you need full control and custom layouts, use TanStack Virtual.
// For complex grids and tables, use React Virtualized.

// Would you like an example of virtualization for an infinite scroll component? 🚀