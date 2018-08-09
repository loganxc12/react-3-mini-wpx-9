import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// Create Unique Api Key
let apiConfig = {
  headers: {
    apikey: 'BrentisLegit'
  }
}

class App extends Component {
  // build constructor to initialize state
  constructor(){
    super();
    this.state = {
          gods: [],
          specificGod: {},
      }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
