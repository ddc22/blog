---
title: Getting to know React performance
excerpt: Have you ever had the question how to measure React performance, well you've come to the right place.
publishDate: 'Jul 1 2025'
tags:
  - React
  - Performance
  - Optimization
  - UI
seo:
  image:
    src: '/react-performance.jpg'
    alt: faster react
---
<style>
  pre { max-height: 500px }
</style>

<p style="display: flex;justify-content: center;">
  <img style="width: 100%;" src="/react-purple.jpg" />
</p>

Knowing how to solve performance is an important toolset in the  arsenal of a React developer. While in general performance problems are hard to come by in your average crud applications. Without knowing how to recognize and understand performance issues it’s hard to fully appreciate the mechanism of solving these problems.

Prerequisites
You need to know how to setup a simple react app and be familiar with the basics of react, JS, HTML and CSS.

Taking the plunge
In order to fully understand the problem of React performance, let’s first setup a simple piece of UI in react. A tree of react elements.

```javascript
function L4({ direction }) {
  return (
    <div className="level" style={{ width: "6px" }}>
      L4{direction === 'left' ? "L" : "R"}
      <div className="lower-level">
        <div className="left" />
        <div className="right" />
      </div>
    </div>
  );
}

function Level3({ direction }) {
  return (
    <div className="level">
      L3: {direction}
      <div className="lower-level">
        <L4 direction="left" />
        <L4 direction="right" />
      </div>
    </div>
  );
}

function Level2({ direction }) {
  return (
    <div className="level">
      L2: {direction}
      <div className="lower-level">
        <Level3 direction="left" />
        <Level3 direction="right" />
      </div>
    </div>
  );
}

function Level1({ direction }) {
  const [counter, setCounter] = useState<number>(0);
  return (
    <div className="level">
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <div>L1 - {direction}  </div>
        <div><button onClick={() => setCounter((c) => c + 1)}>{counter}</button></div>
      </div>
      <div className="lower-level">
        <Level2 direction="left" c={counter} />
        <Level2 direction="left" />
        <Level2 direction="right" />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Level1 />
    </div>
  );
}

export default App;

```

![UI Tree](/ui-tree.jpg)


The first lesson of react rendering is that the sub tree re-renders each time the root node has a state changes. To simulate this a button has been added at the root of the tree to increment a simple state variable. As you can see as we change state a render is triggered at the root of the tree and the entire dom is refreshed.

<p style="display: flex;justify-content: center;">
  <img style="width: 100%;" src="/perf-test-1.gif" />
</p>
