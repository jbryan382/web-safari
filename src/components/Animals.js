import React, { Component } from 'react'
import axios from 'axios'

class Animals extends Component {
  state = {
    results: [],
    animalId: 0,
    animalSpecies: '',
    animalCount: 0,
    animalLocation: ''
  }

  componentDidMount() {
    axios.get('https://localhost:5001/api/Animals').then(resp => {
      console.log({ resp })

      this.setState({
        results: resp.data
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
            {this.state.results.map((animal, i) => {
              return <li key={i}>{this.state.results[i].species}</li>
            })}
          </ul>
          <section>
            <h2>Especially in the Jungle:</h2>
            <ul>
              {this.state.results.map((animal, i) => {
                return (
                  <li key={i}>
                    {this.state.results[i].species
                      ? this.state.results[i].locationOfLastSeen === 'Jungle'
                      : ''}
                  </li>
                )
              })}
            </ul>
          </section>
        </section>
      </>
    )
  }
}

export default Animals
