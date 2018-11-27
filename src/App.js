import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// Create Unique Api Key
let apiConfig = {
  headers: {
    apikey: 'DevMtn'
  }
}

const baseUrl = 'https://ancient-gods-api.now.sh/api/gods';

class App extends Component {
  // build constructor to initialize state
  constructor(){
    super();
    this.state = {
          gods: [],
          oneGod: {},
          oneGodPowers: [],
          name: '',
          origin: '',
          demigod: false,
          image: '',
          power: '',
          editName: false,
          create: false
    }
      this.getGods = this.getGods.bind(this);
      this.updateGod = this.updateGod.bind(this);
      this.createGod = this.createGod.bind(this);
      this.deleteGod = this.deleteGod.bind(this);
      this.updateName = this.updateName.bind(this);
      this.initiateCreate = this.initiateCreate.bind(this);
      this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.getGods();
  }

  getGods(){
    const myPromise = axios.get(baseUrl, apiConfig);
    myPromise.then(res => {
        this.setState({
          gods: res.data,
          oneGod: [], //Why an empty array?
          create: false
        })
      })
  }

  getOneGod(id){
    axios.get(`${baseUrl}/${id}`, apiConfig)
      .then(res => {
        this.setState({
          oneGod: res.data,
          gods: []
        })
      })
  }

  updateGod(){
    const { name } = this.state
    const { id } = this.state.oneGod
    axios.patch(`${baseUrl}/${id}`, {name}, apiConfig)
      .then(res => {
        this.setState({
          oneGod: res.data,
          editName: false,
          name: ""
        })
      })
  }

  updateState(res) {
    console.log(res);
    this.setState({
      gods: res.data,
      create: false,
      demigod: false,
      name: "",
      origin: "",
      image: "",
      power: ""
    })
  }

  createGod() {
    let newGod = {
      name: this.state.name,
      mythology: this.state.origin,
      demigod: this.state.demigod,
      image: this.state.image,
      powers: this.state.power
    }
    axios.post(baseUrl, newGod, apiConfig)
      .then(res => this.updateState(res))
  }

  deleteGod(id){
    axios.delete(`${baseUrl}/${id}`, apiConfig)
      .then(res => {
        this.setState({
          gods: res.data,
          oneGod: {}
        })
      })
  }

  initiateCreate(){
    this.setState({
      create: true,
      gods: [],
      oneGod: [],
    })
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  updateName(){
    this.setState(prevState => {
      return {
        editName: !prevState.editName
      }
    })
  }

  reset(){
    axios.post('https://ancient-gods-api.now.sh/api/gods/reset', {}, apiConfig).then(res => {
      this.setState({
        gods: res.data,
        create: false
      })
    })
  }


  render() {
    const { oneGod, editName, create } = this.state;

    const gods = this.state.gods.map((god, i) => {
      return (
        <div key={god.id} className='gods'>
          <h1>{god.name}</h1>
          <img src={god.image} alt={god.name}  onClick={() => this.getOneGod(god.id)}/>
        </div>
      )
    })

    let oneGodPowers;
    if(this.state.oneGod.powers){
      oneGodPowers = this.state.oneGod.powers.map((power, i) => {
        return (
        <h4 key={i}>{power}</h4>
        )
      })
    }

    return (
      <div className="App">
        <div className='container'>
          <header>
            <h1>The Great Gods</h1>

            {oneGod.name && <button onClick={this.getGods}>GET Gods</button>}
            {create && <button onClick={this.getGods}>GET Gods</button>}
            <button className='reset' onClick={this.reset}>Reset</button>
            <button onClick={this.initiateCreate}>POST God</button>
          </header>

          <div className='gods-parent'>
            {gods}
          </div>

{/* //////////////// One God Section //////////////////////////// */}
        {oneGod.name &&
          <div className="one-god">

              { editName ?
                  <div className='update-flex'>
                    <input 
                    type="text" 
                    placeholder={oneGod.name} 
                    name='name' 
                    value={this.state.name} 
                    onChange={e => this.handleUserInput(e)}
                    /> 
                    <button onClick={this.updateGod}>Update God</button>
                  </div>
                  :
                  <h1>{oneGod.name}<button onClick={this.updateName}>Update Name</button></h1>
              }

              <h4>{oneGod.mythology} {oneGod.demigod ? "Demigod" : "God"}</h4>

              <img src={oneGod.image} alt={oneGod.name}/>

              <h2><u>Powers of {oneGod.name}</u></h2>

              <div>

              {oneGodPowers}
              </div>

              

              <button onClick={() => this.deleteGod(oneGod.id)}>Delete God</button>

          </div> 
        } 
{/* //////////////// End One God Section //////////////////////////// */}

{/* //////////////// Create God Section ///////////////////////////// */}
        { create && 
            <div className='create-flex'>
              <div className="create-inputs">
                <label>Name:</label>
                <input type="text" name='name' value={this.state.name} onChange={e => this.handleUserInput(e)}/>
                <label>Origin:</label>
                <input type="text" name='origin' value={this.state.origin} onChange={e => this.handleUserInput(e)}/>
                <label>Image:</label>
                <input type="text" name='image' value={this.state.image} onChange={e => this.handleUserInput(e)}/>
                <label>Power:</label>
                <input type="text" name='power' value={this.state.power} onChange={e => this.handleUserInput(e)}/>
                <div>
                  <label>Demigod:</label>
                  <input type="radio" onClick={() => this.setState({demigod: true})}/>
                </div>
                <button onClick={this.createGod}>Create</button>
              </div>
              {this.state.image ? <img src={this.state.image} alt={this.state.name}/> : <img src="" alt=""/> }
            </div> 
        }


{/* //////////////// End Create God Section ///////////////////////////// */}

          <h3>&copy; DevMountain. All rights reserved.</h3>

        </div>
      </div>
    );
  }
}

export default App;
