# React 3 Mini-Project

## Project Summary

In this project, we'll introduce how to use `Axios` inside a React Project to make HTTP requests. We will cover full `CRUD` with (GET, PATCH/PUT, POST, DELETE) and also cover how to use the `.then()` method. 

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
- On line 4, import the already installed package `axios` from 'axios'.
- Next, locate the pre-made `config` object at the top of the Component.
- Next to where it says `apikey:`, insert your own unique string.
    * Ex: 'DevMtn'

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
    apikey: 'DevMtn'
  }
}
```

</details>

# Step 2

### Summary

With this project, we want the list of Gods to load as soon as the page is loaded. To do this, we will utilize the React `componentDidMount()` lifecycle hook and invoke a method we will complete in Step 3.

### Instructions

- In `src/App.js`, navigate to the `componentDidMount()` method just below the constructor function. 
- Inside, invoke the `this.getGods`.

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
  componentDidMount(){
    this.getGods();
  }
```

</details>

# Step 3

### Summary

In this step, we are going to build out the `getGods` method that the `componentDidMount()` will use. This method will make an axios call to get the full list of Gods from the API.

### Instructions

- In `src/App.js` navigate to the method titled `getGods`.
- Inside the `getGods()` method, initialize an axios `GET` request to be sent to the `baseUrl` variable created above and set it to a variable called `myPromise`. 
- On the next line, we are going to use the `.then()` method and attach it to the previously created `myPromise` variable.
- Inside the `.then()`, we are going to use a callback with `res` as a parameter.
- Next, inside the callback, we will invoke `setState` to set the: 
  - `gods` property in state equal to `res.data`, 
  - `oneGod` property set to an empty array,
  - `create` property set to false 

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
  getGods(){
    let myPromise = axios.get(baseUrl, apiConfig);
    myPromise.then(res => {
      this.setState({
        gods: res.data,
        oneGod: [],
        create: false,
      })
    })
  }
```

</details>

# Step 4

### Summary

In this step, we will complete the `getOneGod` method that will help us isolate a single god to view their additional information. 

### Instructions

- In `src/App.js`, navigate to the `getOneGod` method below the `getGods` method we completed in the last step. 
- Inside the method, initialize another axios `GET` request except this time, don't set it to a variable.
- Since we didn't set the axios call to a variable, in this step we will chain the `.then()` method directly onto the axios call.
- We will pass the `.then()` a callback, with `res` as a parameter and inside the function, we will need`setState` for the following properties:
    - `oneGod` property equal to `res.data`,
    - `gods` to an empty array

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
    axios.get(`${baseUrl}/${id}`, apiConfig).then(res => {
      this.setState({
        oneGod: res.data,
        gods: []
      })
    })
```

</details>

# Step 5

### Summary

In this step, we'll complete the `updateGod` method to make an axios `PATCH` request to edit a specific gods name. The important part in this step is understanding that the `PATCH` method only updates what needs to be updated.  

### Instructions

- In `src/App.js`, navigate to the `updateGod` method and once inside - initialize an axios `PATCH` request with the `.then()` method attached at the end.
- This time though, we will need to make use of a template literal to use the `id` from state to indicate which god we are updating.
- Additionally, we will need to include the value that we are updating as the body of our request, in this case it will be the destructered name value from state.
- Next, inside the `.then()` we'll need to use another callback that uses `res` as a parameter and then inside the callback, invoke the `setState` function.
- When setting state in this method, we need to set:
  - `oneGod` to the data returned in our response, 
  - `editName` to false,
  - `name` property to an empty string

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
  updateGod(){
    const { name } = this.state
    const { id } = this.state.oneGod
    axios.patch(`${baseUrl}/${id}`, {name}, apiConfig).then(res => {
      this.setState({
        oneGod: res.data,
        editName: false,
        name: ''
      })
    })
  }
```

</details>

# Step 6

### Summary

To show the different ways to use the `.then()`, we're going to setup an additional function that we'll use in the method we build in step 8. 

### Instructions

- Below the `updateGod` method, create a method titled `updateState` that takes in `promise` as a parameter. 
- Inside this method, use setState to correctly update our applications state once we receive our response. We'll need to setState on the following properties:
  - `gods` to the data's promise
      - console log the promise parameter if you need help
  - `create` and `demigod` to false,
  - `name`, `origin`, `image` and `power` to empty strings

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```js
  updateState(res){
    this.setState({
      gods: res.data,
      create: false, 
      demigod: false,
      name: '',
      origin: '',
      image: '',
      power: ''
    })
  }
```

</details>

# Step 7

### Summary

In this step, we'll complete the `createGod` method to make an axios `POST` request to edit a specific gods name. The important part in this step is understanding that the `POST` method is used to create a new value.  

### Instructions

- Locate the `createGod` method below the method we created in the previous step.
- Taking advantage of the `newGod` variable already created as a body for our request, make a request using the API documentation for a `POST` request. 
- Once we receive our response, in the requests' `.then()` method, use `res` as a parameter and create a callback that invokes the `updateState` method created in the previous step.


### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```js
  createGod(){
    let newGod = {
      name: this.state.name,
      mythology: this.state.origin,
      demigod: this.state.demigod,
      image: this.state.image,
      powers: this.state.power
    }
    axios.post(baseUrl, newGod, apiConfig).then(res => this.updateState(res))
  }
```

</details>

# Step 8

### Summary

For our final step, we'll complete the `deleteGod` method to make an axios `DELETE` request to edit a specific gods name. The important part in this step is understanding that the delete method is only used to delete values.  

### Instructions

- Locate the `deleteGod` method.
- Inside, we will need to use axios to make a `DELETE` request to the API according to it's documentation.
- As part of the request URL, make sure to use the `id` to indicate to the API which God we are deleting.
- Once we receive the response, set state on the following properties:
  - `gods` to the response data,
  - `oneGod` to an empty object. 

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```js
 deleteGod(id){
    axios.delete(baseUrl + `/${id}`, apiConfig).then(res => {
      this.setState({
        gods: res.data,
        oneGod: {}
      })
    })
  }
```

</details>

# Black Diamond

If you are looking for extra practice with React on your own time, try spreading this functionality into separate components. The `Update` functionality can be passed as props to an Update Component, or the `Delete` functionality can be used in a Delete Component. You can even create separate components for each button in the Application.

# Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

# Copyright


© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>