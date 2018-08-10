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
      }
      this.getGods = this.getGods.bind(this);
  }

  // componentDidMount(){
  //   console.log(apiConfig)
  //   axios.post('https://ancient-gods-api.now.sh/api/gods/reset', {}, apiConfig).then(res => {
  //     this.setState({
  //       gods: res.data
  //     })
  //   })
  // }

getGods(){
  console.log('hit')
  // axios (GET)
  axios.get(baseUrl, apiConfig).then(res => {
    console.log(res)
    this.setState({
      gods: res.data,
      oneGod: []
    })
  })
  // setState with response -> gods
}

getOneGod(id){
  // axios (GET)
  console.log('one god hit', id)
  axios.get(`${baseUrl}/${id}`, apiConfig).then(res => {
    let oneGodPowers = res.data.powers.map((power, i) => {
      return (
       <h4 key={i}>{power}</h4>
      )
    })
    this.setState({
      oneGod: res.data,
      oneGodPowers: oneGodPowers,
      gods: []
    })
  })
  // setState with response -> oneGod
}

updateGod(id){
  // axios (PATCH)
  // setState with ????????????????
}

createGod(){
  // axios (POST)
  // setState with ????????????????
}

deleteGod(id){
  // axios (DELETE)
  console.log(id)
  axios.delete(baseUrl + `/${id}`, apiConfig).then(res => {
    this.setState({
      gods: res.data,
      oneGod: {}
    })
  })
  // setState with ?????????????????
}



  render() {

    const { oneGod, oneGodPowers } = this.state;

    const gods = this.state.gods.map(god => {
      return (
        <div key={god.id} className='gods'>
          <h2>{god.name}</h2>
          <img src={god.image} alt={god.name}  onClick={() => this.getOneGod(god.id)}/>
        </div>
      )
    })
    
    return (
      <div className="App">
        <div>
          <header>
            <h1>The Great Gods</h1>

            <button onClick={this.getGods}>GET the Gods</button>
            <button onClick={() => this.setState({gods: [], oneGod: []})}>Reset</button>
          </header>

          {/* Render Gods Array */}
          <div className='gods-parent'>
            {gods}
          </div>

        {oneGod.name ? 
          <div className="one-god">
              <h1>{oneGod.name}<i class="fas fa-pen"></i></h1>
              <h4>{oneGod.mythology} {oneGod.demigod ? "Demigod" : "God"}</h4>
              <img src={oneGod.image} alt={oneGod.name}/>
              <h2><u>Powers of {oneGod.name}</u></h2>
              {oneGodPowers}

              <button>Update God</button>
              <button onClick={() => this.deleteGod(oneGod.id)}>Delete God</button>
          </div> : null}
        </div>
      </div>
    );
  }
}

export default App;
