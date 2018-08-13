import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

//import axios
import axios from 'axios';

// Create Unique Api Key
let apiConfig = {
  headers: {
    apikey: 'B'
  }
}

const baseUrl = 'https://ancient-gods-api.now.sh/api/gods'

class App extends Component {
  // build constructor to initialize state
  constructor(){
    super();
    this.state = {
          gods: [],
          oneGod: {},
          oneGodPowers: [],
          editName: false,
          name: '',
          origin: '',
          demigod: false,
          image: '',
          power: '',
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
    let myPromise = axios.get(baseUrl, apiConfig)
    myPromise.then(res => {
      this.setState({
        gods: res.data,
        oneGod: [],
        create: false
      })
    })
  }

  getGods(){
    // axios (GET)
    axios.get(baseUrl, apiConfig).then(res => {
      this.setState({
        gods: res.data,
        oneGod: [],
        create: false,
      })
    })
    // setState with response -> gods
  }

  getOneGod(id){
    // axios (GET)
    console.log('one god hit', id)
    axios.get(`${baseUrl}/${id}`, apiConfig).then(res => {
      console.log('data', res.data)
      let oneGodPowers;
      if(typeof(res.data.powers) !== "string"){
        console.log( )
          oneGodPowers = res.data.powers.map((power, i) => {
            return (
            <h4 key={i}>{power}</h4>
            )
          })
      } else {
        oneGodPowers = res.data.powers
      }
      this.setState({
        oneGod: res.data,
        oneGodPowers: oneGodPowers,
        gods: []
      })
    })
    // setState with response -> oneGod
  }

  updateGod(){
    const { name } = this.state
    const { id } = this.state.oneGod
    // axios (PATCH)
    axios.patch(`${baseUrl}/${id}`, {name}, apiConfig).then(res => {
      let oneGodPowers;
      if(res.data.powers){
        oneGodPowers = res.data.powers.map((power, i) => {
          return (
          <h4 key={i}>{power}</h4>
          )
        })
      }
      this.setState({
        oneGod: res.data,
        editName: false,
        oneGodPowers: oneGodPowers || [],
        name: ''
      })
    })
    // setState with ????????????????
  }

  createGod(){
    let newGod = {
      name: this.state.name,
      mythology: this.state.origin,
      demigod: this.state.demigod,
      image: this.state.image,
      powers: this.state.power
    }
    // axios (POST)
    axios.post(baseUrl, newGod, apiConfig).then(res => {
      this.setState({
        gods: res.data,
        create: false, 
        name: '',
        origin: '',
        demigod: '',
        image: '',
      })
    })
    // setState with ????????????????
  }

  deleteGod(id){
    // axios (DELETE)
    axios.delete(baseUrl + `/${id}`, apiConfig).then(res => {
      this.setState({
        gods: res.data,
        oneGod: {}
      })
    })
    // setState with ?????????????????
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
    console.log(this.state)
    const { oneGod, oneGodPowers, editName, create } = this.state;

    const gods = this.state.gods.map((god, i) => {
      let classname;
      console.log(i % 2 === 0)
      if(i % 2 === 0){
        classname = 'gods even'
      } else {
        classname = 'gods odd'
      }
      return (
        <div key={god.id} className={classname}>
          <h1>{god.name}</h1>
          <img src={god.image} alt={god.name}  onClick={() => this.getOneGod(god.id)}/>
        </div>
      )
    })
    
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
                  <h1>{oneGod.name}<i className="fas fa-pen" onClick={this.updateName}></i></h1>
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
