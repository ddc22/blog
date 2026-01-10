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
    src: './cover.jpg'
    alt: React component optimization visualization
---

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
