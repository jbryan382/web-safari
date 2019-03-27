import React, { Component } from 'react'
import axios from 'axios'

class Animals extends Component {
  state = {
    animals: [],
    location: '',
    animalLocation: [],
    deleteLocation: [],
    totalNumberOfAnimals: '',
    animalsToCount: [],
    lionTigerBear: '',
    targetAnimals: []
  }

  componentDidMount() {
    axios.get('https://localhost:5001/api/Animals').then(resp => {
      console.log({ resp })

      this.setState({
        animals: resp.data
      })
    })
    this.getJungleAnimals()
  }

  getJungleAnimals = () => {
    axios
      .get(`https://localhost:5001/api/Animals/location/jungle`)
      .then(resp => {
        console.log({ resp })
        this.setState({
          animalLocation: resp.data
        })
      })
  }

  // countAnimals = () => {
  //   let count = 0;
  //   let LTBCount = 0;

  // }

  deleteLocation = () => {
    axios
      .delete(`http://localhost:5001/api/Animals/location/desert`)
      .then(resp => {
        console.log({ resp })
        this.setState({
          deleteLocation: resp.data
        })
      })
  }

  render() {
    return (
      <>
        <h1>Place Animals Here</h1>
        <section>
          <h2>Be careful of all those animals out there:</h2>
          <ul>
            {this.state.animals.map((animal, i) => {
              return <li key={i}>{this.state.animals[i].species}</li>
            })}
          </ul>
          <section>
            <h2>Especially in the Jungle:</h2>
            {/* <button onClick={this.findByLocation}>Enter</button> */}
            <ul>
              {this.state.animalLocation.map((animal, i) => {
                return <li key={i}>{this.state.animalLocation[i].species}</li>
              })}
            </ul>
          </section>

          <section>
            <button onClick={this.deleteLocation}>
              Who needs Desert Animals... right?
            </button>
          </section>
        </section>
      </>
    )
  }
}

export default Animals
