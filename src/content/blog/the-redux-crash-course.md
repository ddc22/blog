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
