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

- In your terminal, navigate to the current project directory.
- Run this command `npm install axios` or `yarn add axios`.
- Now open `./src/App.js`.
- On line 4, import the `axios` npm package from 'axios' 
- Next, locate the pre-made `config` object at the top of the Component.
- Next to where it says `apikey:`, insert your own unique string.
    * Ex: 'DevMtn-is-Legit'

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

### Instructions

### Solution

<details>

<summary> <code> File Name </code> </summary>

```
```

</details>

# Step 3

### Summary

### Instructions

### Solution

<details>

<summary> <code> File Name </code> </summary>

```
```

</details>

# Step 4

### Summary

### Instructions

### Solution

<details>

<summary> <code> File Name </code> </summary>

```
```

</details>

# Step 5

### Summary

### Instructions

### Solution

<details>

<summary> <code> File Name </code> </summary>

```
```

</details>

# Step 6

### Summary

### Instructions

### Solution

<details>

<summary> <code> File Name </code> </summary>

```
```

</details>

