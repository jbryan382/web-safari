import React, { Component } from 'react'
import axios from 'axios'

class Animals extends Component {
  state = {
    animals: [],
    location: '',
    animalLocation: [],
    deleteLocation: [],
    totalNumberOfAnimals: 0,
    LTBCounter: 0
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

  countAnimals = () => {
    let count = 0
    let LTBCount = 0

    for (let i = 0; i < this.state.animals.length; i++) {
      count += this.state.animals[i].countOfTimesSeen
    }

    for (let j = 0; j < this.state.animals.length; j++) {
      if (
        this.state.animals[j].species.toLowerCase() === 'Lion' ||
        this.state.animals[j].species.toLowerCase() === 'tiger' ||
        this.state.animals[j].species.toLowerCase() === 'Bear'
      ) {
        LTBCount += this.state.animals[j].countOfTimesSeen
      }
    }
    this.setState({
      totalNumberOfAnimals: count,
      LTBCounter: LTBCount
    })
  }

  deleteLocation = () => {
    axios
      .delete(`https://localhost:5001/api/Animals/location/desert`)
      .then(resp => {
        console.log({ resp })
        this.componentDidMount()
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
            <button onClick={this.countAnimals}>
              Lets Count Together 1... 2.... 3....
            </button>
          </section>
          <h3>{this.state.totalNumberOfAnimals}</h3>
          <h3>{this.state.LTBCounter}</h3>
        </section>
      </>
    )
  }
}

export default Animals
