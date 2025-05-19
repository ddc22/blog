---
title: React Short Notes - Cheat Sheet
excerpt: A collection of essential React patterns, tips, and code snippets to boost your productivity. This cheat sheet covers everything from component basics to advanced hooks usage.
publishDate: 'May 05 2025'
tags:
  - React
  - JavaScript
  - Cheatsheet
  - Frontend
seo:
  image:
    src: '/react-code.jpg'
    alt: React code snippets on a dark background
---

![React code snippets on a dark background](/react-code.jpg)

**Note:** This cheat sheet compiles commonly used React patterns and techniques for quick reference.

A set of ongoing gotchas that will be useful when starting off with React. Bookmark this page for a quick reference to React fundamentals.

## Router Exposed

The following util Variables To Props: All components presented by a react-router expose the following objects to props:

1. **children**
2. **location**
3. **params**
4. **route**
5. **routeParams**
6. **router**

## Passing Values Down Component with this.props

If we set the following props in JSX:

```jsx
<MyComponent name="John" age={25} isActive={true} />
```

We can access them in our component like:

```jsx
function MyComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Active: {props.isActive ? "Yes" : "No"}</p>
    </div>
  );
}
```

> "Learn the rules like a pro, so you can break them like an artist." - This applies perfectly to React development, where understanding the fundamentals enables creative problem-solving.

## Conditional Rendering

There are several ways to conditionally render components:

### Using Ternary Operators

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn 
        ? <h1>Welcome back!</h1> 
        : <h1>Please sign in.</h1>
      }
    </div>
  );
}
```

### Using && Operator

```jsx
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>You have {unreadMessages.length} unread messages.</h2>
      }
    </div>
  );
}
```

## Event Handling

```jsx
function Button() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The button was clicked');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

## Lifecycle Methods (Class Components)

1. **componentDidMount()**: Invoked immediately after a component is mounted
2. **componentDidUpdate(prevProps, prevState)**: Invoked immediately after updating
3. **componentWillUnmount()**: Invoked immediately before a component is unmounted

## Hooks (Functional Components)

### useState

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    
    // Similar to componentWillUnmount:
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

This cheat sheet will be updated with more React patterns and tips as they come up! Keep checking back for new additions and optimizations to improve your React development workflow.