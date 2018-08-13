# React 3 Mini-Project

## Project Summary

In this project, we'll introduce how to use `Axios` inside a React Project to make HTTP requests. In this project, we will cover full `CRUD` with (GET, PATCH/PUT, POST, DELETE) and also cover how to use the `.then()` method. 

Don't worry about any preexisting code in this project, the important part here is to focus only on how we are interacting with the API using `Axios`

# Setup

1) `Fork` and `clone` this repository.
2) `cd` into the project directory.
3) Run `npm install` or `yarn`
4) Run `npm start` or `yarn start`
5) In a seperate terminal, `cd` into the project directory.

# API Documentation

We will be using this [API](https://ancient-gods-api.now.sh/).

During this project, we will use an API created by Phoenix Mentor - Hunter Sexton. Please refer to this API documentation when completing the project steps. 

# Step 1

### Summary

In this step, we are going to install the `axios` npm package and setup our API configuration to include a unique API key. 

### Instructions

- Now open `./src/App.js`.
- On line 4, import the already installed package `axios` from 'axios' 
- Next, locate the pre-made `config` object at the top of the Component.
- Next to where it says `apikey:`, insert your own unique string.
    * Ex: 'DevMtn-is-Awesome'

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import axios package
import axios from 'axios';

// Create unique api key
let apiConfig = {
  headers: {
    apikey: 'SoulSurfer'
  }
}
```

</details>

# Step 2

### Summary

With this project, we want the list of Gods to load as soon as the page is loaded. To do this, we will utilize the React `componentDidMount()` lifecycle hook.

### Instructions

- In `src/App.js`, navigate to the `componentDidMount()` method just below the constructor function. 
- Inside the `componentDidMount()`, initialize an axios `GET` request to be sent to the `baseUrl` variable created above and set it to a variable called `myPromise`. 
- On the next line, we are going to use the `.then()` method and attach it to the previously created `myPromise` variable.
- Inside the `.then()`, we are going to use a callback with `res` as a parameter.
- Next, inside the callback, we will invoke `setState` to set the `gods` property in state equal to `res.data`, the `oneGod` property set to an empty array and the `create` property set to false. 

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
  componentDidMount(){
    let myPromise = axios.get(baseUrl, apiConfig)
    myPromise.then(res => {
      this.setState({
        gods: res.data,
        oneGod: [],
        create: false
      })
    })
  }
```

</details>

# Step 3

### Summary

### Instructions

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```

```

</details>

# Step 4

### Summary

### Instructions

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```
```

</details>

# Step 5

### Summary

### Instructions

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```
```

</details>

# Step 6

### Summary

### Instructions

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```
```

</details>

# Black Diamond

If you are looking for extra practice with React on your own time, try spreading this functionality into separate components. The `Update` functionality can be passed as props to an Update Component, or the `Delete` functionality can be used in a Delete Component. 
