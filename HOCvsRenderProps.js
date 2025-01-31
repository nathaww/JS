// Higher-Order Components (HOC) vs. Render Props in React
// Both Higher-Order Components (HOC) and Render Props are patterns used in React for code reuse, but they differ in their implementation and use cases.

// 1. Higher-Order Component (HOC)
// A Higher-Order Component (HOC) is a function that takes a component as input and returns a new enhanced component. It is used to reuse component logic across multiple components.

// Use Cases:
// Authentication handling
// Logging
// Data fetching
// Managing UI state (e.g., modal visibility, theme)
// Implementation

import React, { useEffect, useState } from "react";

// HOC: Fetch data and pass it as props
function withDataFetching(WrappedComponent, url) {
  return function EnhancedComponent() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);

    return <WrappedComponent data={data} />;
  };
}

// Example Component using HOC
const UserList = ({ data }) => (
  <ul>
    {data.map((user) => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

const UsersWithData = withDataFetching(UserList, "https://jsonplaceholder.typicode.com/users");

export default function App() {
  return <UsersWithData />;
}

// How It Works?
// withDataFetching is a function that wraps a component and adds the data-fetching logic.
// The wrapped component (UserList) receives the fetched data as props.
// This allows us to reuse withDataFetching for different components.
// Pros & Cons of HOC
// ✅ Pros:

// Clean and reusable logic.
// Keeps components focused on UI.
// Easy to share behavior across multiple components.
// ❌ Cons:

// Can lead to wrapper hell (deeply nested components).
// Hard to debug due to multiple layers of abstraction.
// 2. Render Props
// Render Props is a pattern where a component receives a function as a prop and calls it to return JSX.

// Use Cases:
// Sharing logic between components.
// State management (e.g., toggling UI elements).
// Handling asynchronous operations.
Implementation

import React, { useEffect, useState } from "react";

// Render Props Component
const DataFetcher = ({ url, children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return children(data);
};

// Example usage
export default function App() {
  return (
    <DataFetcher url="https://jsonplaceholder.typicode.com/users">
      {(users) => (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </DataFetcher>
  );
}

// How It Works?
// DataFetcher is a component that fetches data and calls the children function with the fetched data.
// Inside App, we pass a function that receives users and renders the UI.
// Pros & Cons of Render Props
// ✅ Pros:

// More flexible than HOCs.
// Avoids component nesting issues (wrapper hell).
// Can dynamically control rendering logic.
// ❌ Cons:

// Can cause prop drilling when passing many props.
// Readability decreases if overused.
// HOC vs. Render Props: Key Differences
// Feature	HOC	Render Props
// Implementation	Function that wraps a component	Component that calls a function as children
// Reusability	High, can wrap multiple components	High, but function-based logic reuse
// Readability	Can lead to deep nesting (wrapper hell)	Can cause prop drilling if overused
// Use Cases	Authentication, logging, fetching data	Toggle state, handling async data, flexible rendering
// When to Use What?
// Use HOCs when you need to wrap components with common logic (e.g., authentication, logging).
// Use Render Props when you need more flexibility in controlling how data is rendered.
// With React Hooks, Both Patterns Are Less Common
// With hooks like useState, useEffect, and useContext, many use cases for HOCs and Render Props can now be handled more cleanly.