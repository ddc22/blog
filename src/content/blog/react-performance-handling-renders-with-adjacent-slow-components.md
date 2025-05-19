# Dev Voyage Blog - Astro Posts

## Post 1: React Performance: Handling Renders with Adjacent Slow Components
**File name:** `src/content/blog/react-performance-handling-renders-with-adjacent-slow-components.md`

```md
---
title: React Performance - Handling Renders with Adjacent Slow Components
excerpt: Having sibling or child components that are slow can significantly impact your React application's performance. Learn effective strategies to optimize rendering and prevent slow components from blocking your entire app.
publishDate: 'May 19 2025'
tags:
  - React
  - Performance
  - JavaScript
seo:
  image:
    src: '/react-performance.jpg'
    alt: React component optimization visualization
---

![React component optimization visualization](/react-performance.jpg)

**Note:** This article explores advanced React optimization techniques for handling performance bottlenecks caused by slow components.

Having sibling/child components that are slow can cause significant performance issues in your React application. When making changes to a component, it's important to understand that it can affect performance even with the simple addition of a local state.

## The Problem

In the example below, we look at a root level app which has an extremely slow component (slowness simulated). The requirement is to add a small counter button at the root level:

```jsx
function App() {
  // Adding new state
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Hidden Count: {count}
      </button>
      <SomeSlowComponent />
      <SomeOtherComponent />
    </>
  );
}
```

As you can see, each time we click this button, a state change will re-render the entire state tree, including the slow component which blocks the entire app.

## Solution 1: Component Encapsulation

One solution is to hide the cause for the render inside a component:

```jsx
function HiddenCount() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      HIDDEN Count: {count}
    </button>
  );
}

function App() {
  // Adding new state
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Count: {count}
      </button>
      <HiddenCount />
      <SomeSlowComponent />
      <SomeOtherComponent />
    </>
  );
}
```

This works because now the reason for the render is hidden away behind a component. This prevents the slow component from being exposed to an unnecessary re-render.

> When optimizing React applications, understanding the component hierarchy and when components re-render is crucial for maintaining smooth user experiences.

## What if a state change is required at the parent level?

There can be instances where moving code into an encapsulated component may not be possible due to the nature of the requirement.

For example, if the color of the enclosing div of the entire app needs to change on the click of a button:

```jsx
import { useState } from "react";
import { SomeOtherComponent } from "./SomeOtherComponent";
import { SomeSlowComponent } from "./SomeSlowComponent";
import "./styles.css";

export default function App() {
  const [color, setColor] = useState(123000);
  
  return (
    <div style={{ backgroundColor: `#${color}` }}>
      <button onClick={() => setColor(Math.round(Math.random() * 1000) * 1000)}>
        Inline Color: {color}
      </button>
      <br />
      <SomeSlowComponent />
      <br />
      <SomeOtherComponent />
    </div>
  );
}
```

## Solution 2: Pass Components as Props

The principle is the same. We need to hide the state change away from the slow component code using component encapsulation. This can be done by moving the surrounding div and the state into a component and injecting the slow components as props:

```jsx
import { useState } from "react";
import { SomeOtherComponent } from "./SomeOtherComponent";
import { SomeSlowComponent } from "./SomeSlowComponent";
import "./styles.css";

function UIContainer({ slowComponent, otherComponent }) {
  const [color, setColor] = useState(123000);
  
  return (
    <div style={{ backgroundColor: `#${color}` }}>
      <button onClick={() => setColor(Math.round(Math.random() * 1000) * 1000)}>
        Inline Color: {color}
      </button>
      <br />
      {slowComponent}
      <br />
      {otherComponent}
    </div>
  );
}

export default function App() {
  return (
    <UIContainer
      slowComponent={<SomeSlowComponent />}
      otherComponent={<SomeOtherComponent />}
    />
  );
}
```

Since the slower components are passed in as props, we no longer see the heavy renders blocking the state update. This pattern effectively separates state changes from expensive render operations, resulting in a much more responsive application.
```

## Post 2: Organising Your Node Code into Separate Node Modules
**File name:** `src/content/blog/organising-your-node-code-into-separate-node-modules.md`

```md
---
title: Organising Your Node Code into Separate Node Modules
excerpt: As your Node.js projects grow in complexity, modularizing your codebase becomes essential. This guide explores how to structure and organize your Node.js applications into maintainable modules.
publishDate: 'May 18 2025'
tags:
  - Node.js
  - Architecture
  - JavaScript
seo:
  image:
    src: '/node-modules.jpg'
    alt: Node.js code organization diagram
---

![Node.js code organization diagram](/node-modules.jpg)

**Note:** This article provides practical guidance for structuring large-scale Node.js applications using modular architecture.

NodeJS and the JavaScript/NPM ecosystem have exploded in use over the past few years. The ability to rapidly develop features has made NodeJS a fantastic choice for early-stage startups and products. However, as the Node ecosystem has matured, increasingly complex and enterprise-grade software is being built around isomorphic JavaScript.

## The Challenge of Modularization

A common hurdle you'll have to cross is figuring out how to organize, structure, and "modularize" your codebase so it becomes easier to manage as it grows. This guide answers this question using Lerna, a multi-module package manager.

> Writing an exportable NPM package is a separate lesson in itself and is not the scope of this guide. Please check out [this guide](https://medium.com/@jdc91xt/published-your-first-node-module-252ec6b8b0e9) for a simple explanation on how to do this.

## Understanding How node_modules Work

![Node.js modules structure](/nodejs-modules.png)

The typical naive approach to working with modules is already familiar to you. You just install a dependency using the npm install command:

```bash
npm install --save axios
```

What happens here is that the relevant code will be copied as a module into your node_modules folder. Now whenever you run node within this project, these packages are accessible via the "require syntax".

However, when you want to break up your own codebase into modules, a few issues can crop up. The key issue being:

**Do I need to publish changes to the npm registry each time I make a change to my submodules?**

## Local Modules Solution

NPM has provided a handy solution where you can easily install a local module using:

```bash
npm install --save file:../local-submodule-X
```

Specifying the module as `file:../local-submodule-X` is as simple as providing the relative path to the module with the "file:" prefix. This symlinks your local module to the current module's node_modules folder. By definition, any changes made to your local submodule are automatically visible.

This solution should be sufficient to get you up and running with 2 or 3 modules, but it has some issues:

1. **Managing versioning** of all modules
2. **Handling modules** that require transpilations (JSX, TypeScript, ESNext Features)
3. **Managing the dependency graph** across modules
4. **Running commands** in all submodules when the number of modules grows

Lerna is a fantastic tool to answer all of these problems, which we'll explore in another post. By implementing a modular architecture early in your project's lifecycle, you'll save countless hours of refactoring and maintenance as your application scales.
```

## Post 3: The Redux Crash Course
**File name:** `src/content/blog/the-redux-crash-course.md`

```md
---
title: The Redux Crash Course
excerpt: Redux has become a cornerstone of state management in React applications. This comprehensive guide breaks down the core concepts of Redux and provides practical implementation examples.
publishDate: 'May 15 2025'
tags:
  - Redux
  - React
  - JavaScript
  - State Management
seo:
  image:
    src: '/redux-crash-course.jpg'
    alt: Redux state flow diagram
---

![Redux state flow diagram](/redux-crash-course.jpg)

**Note:** This article provides a beginner-friendly introduction to Redux. The code examples are available [on GitHub](https://github.com/jdc91/redux-beginner).

A beginner's guide to Redux and state management in React applications. Understanding Redux will transform how you think about state in your applications.

## Intro to Redux as a State Management Library

> Skip this section if you want to dive straight into the meaty stuff

The React universe can be a quite weird place to step into. But with time, you learn to tame the beast and get the hang of what it's all about. However, true mastery comes with building an application. So if you're new to React, go back and build some [cool idea](https://javascript30.com/) so that you learn to [think in React](https://reactjs.org/docs/thinking-in-react.html). This article focuses on being a crash course by adding a state management library called Redux.

As you mature with React, one thing that might come up is the need for a proper way to manage your state. Redux by no means is the single answer. It's a price you pay in return for some key features. So [choose wisely](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367). This article is for those who are here to dive head first into Redux and what this hype is all about.

## Flux

Remember the first time you heard "unidirectional data flow"? Well, it is one of the single most important principles that governs React and, by extension, Redux. This one-way data flow pattern was coined by Facebook as Flux. Redux is heavily influenced by Flux with a few distinctions.

![Flux Pattern](/flux-pattern.png)

Watch [this video](https://www.youtube.com/watch?list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v&time_continue=621&v=nYkdrAPrdcw) for a more in-depth idea of Flux.

## Redux vs Flux: Key Differences

### The Store
1. **Flux**: Can have multiple stores
2. **Redux**: Single store

### Dispatcher
1. **Flux**: Dispatcher should dispatch to multiple stores
2. **Redux**: Action dispatched to the Redux store directly

### Reducers
1. **Flux**: Contained within stores, mutations frowned upon
2. **Redux**: Reducers provided to the store externally, mutations actively discouraged (pure functions required)

The basic story behind Redux is that there is one single store with all your global state. Actions are literal or logical events in your app like adding an item to a list, receiving user details payload, a checkbox being ticked, and so on. These actions create a brand new state of the app with the help of the reducers.

![Redux Flow](/redux-flow.png)

This is probably the most simple way to understand Redux.

## Let's Code: A Counter Example

Let's see how a simple counter looks with vanilla Redux. Go through the comments and get an idea of what is happening here. BEWARE! This is not a production-ready approach, just a contrived example to explain how simple Redux really is.

```jsx
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

// This is the reducer function that takes the current state and an action
// and returns a new state
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app
const store = createStore(counter);

// Counter component
class Counter extends React.Component {
  componentDidMount() {
    // Subscribe to store updates
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    // Clean up subscription
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>Count: {store.getState()}</h1>
        <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
          +
        </button>
        <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
          -
        </button>
      </div>
    );
  }
}

// Render the counter
ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
```

This is as simple as it gets, but there are some problems with this approach:

1. **Subscribing to the store for changes is cumbersome on every component. Any better way to do this?**  
   Answer: [react-redux](https://react-redux.js.org/)

2. **Is immutability that important? I just mutated my state and it all just works fine.**  
   Answer: Immutability is vital! You will miss out on a lot of Redux perks without getting this right, and you will also face side-effects in your app with React.

3. **What if I want to pass down the store state to my children? Should I use context or pass down via props?**  
   Answer: [react-redux](https://react-redux.js.org/)

4. **Is there a way to log all actions to a third-party server? Should I just subscribe to the store and publish? But then I can't see the action, right?**  
   Answer: [Middleware](https://redux.js.org/advanced/middleware)

5. **This was all synchronous. What happens when I want to do something asynchronously? Do I just dispatch an action on completion of the action?**  
   Answer: [Thunk](https://github.com/reduxjs/redux-thunk)

It's important to understand that there is way more ground to cover before you can start using Redux in your next production app, with topics like react-redux bindings, middleware and thunk, the importance of immutability, and immutable update patterns! I will cover them gradually in this series.
```

## Post 4: Publishing Your First Node Module
**File name:** `src/content/blog/publishing-your-first-node-module.md`

```md
---
title: Publishing Your First Node Module
excerpt: Create and publish your own NPM package with this straightforward guide. Learn the essential steps from setting up your NPM account to releasing updates for your package.
publishDate: 'May 10 2025'
tags:
  - Node.js
  - NPM
  - JavaScript
  - Tutorial
seo:
  image:
    src: '/npm-publish.jpg'
    alt: NPM package publishing process
---

![NPM package publishing process](/npm-publish.jpg)

**Note:** This quick guide will walk you through the process of publishing your first Node.js module to the NPM registry.

This is a quick guide on publishing your very first node module to the NPM registry. Follow these straightforward steps to get your code published and available for others to use.

## Create an NPM Account and Login in Your Terminal

### Step 1: Create a Free NPM Account
Create a free NPM account at [https://www.npmjs.com/](https://www.npmjs.com/) (remember the email, username, and password)

### Step 2: Login to NPM via Terminal
Open any terminal and login to this NPM account using:

```bash
npm login
```

You will be prompted to enter your username, password, and email address.

> "Good code is its own best documentation. As you're about to add a comment, ask yourself, 'How can I improve the code so that this comment isn't needed?'" - Steve McConnell

## Create Your Module

### Step 3: Create a New Folder and Initialize

```bash
mkdir my-first-module
cd my-first-module
npm init
```

Answer the prompts to generate your `package.json` file.

### Step 4: Create Your Module Code

Create an `index.js` file with your module's functionality:

```javascript
// index.js
function sayHello(name) {
  return `Hello, ${name}!`;
}

module.exports = {
  sayHello
};
```

### Step 5: Test Your Module Locally

Make sure your module works as expected before publishing.

## Publish Your Module

### Step 6: Check if the Package Name is Available

```bash
npm search your-package-name
```

### Step 7: Publish to NPM Registry

```bash
npm publish
```

If this is your first time publishing, you might need to:

```bash
npm publish --access=public
```

### Step 8: Verify Your Package

Visit `https://www.npmjs.com/package/your-package-name` to see your published module.

## Updating Your Module

### Step 9: Update Your Code

Make changes to your module's code.

### Step 10: Update the Version

```bash
npm version patch  # For bug fixes
npm version minor  # For new features
npm version major  # For breaking changes
```

### Step 11: Publish the Update

```bash
npm publish
```

Congratulations! You've published your first node module to the NPM registry. This opens the door to contributing to the vast ecosystem of JavaScript libraries and tools that power modern web development.
```

## Post 5: React Short Notes - Cheat Sheet
**File name:** `src/content/blog/react-short-notes-cheat-sheet.md`

```md
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
    src: '/react-cheatsheet.jpg'
    alt: React code snippets on a dark background
---

![React code snippets on a dark background](/react-cheatsheet.jpg)

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
```
