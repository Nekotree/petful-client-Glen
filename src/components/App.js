import React, { Component } from 'react';
import config from './config';
import LandingPage from './LandingPage';
import PetfulContext from './PetfulContext';
import Adoption from './Adoption';
import { Switch, Route } from 'react-router-dom';

class App extends Component {

  state = {
    people: [],
    cats: [],
    dogs: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/people`),
      fetch(`${config.API_ENDPOINT}/cats`),
      fetch(`${config.API_ENDPOINT}/dogs`),
    ])
      .then(([resPeople, resCats, resDogs]) => {
        if (!resPeople.ok) {
          return resPeople.json().then(e => Promise.reject(e));
        }
        if (!resCats.ok) {
          return resCats.json().then(e => Promise.reject(e));
        }
        if (!resDogs.ok) {
          return resDogs.json().then(e => Promise.reject(e));
        }

        return Promise.all([resPeople.json(), resCats.json(), resDogs.json()]);
      })
      .then(([people, cats, dogs]) =>
        this.setState(
          {
            people: people,
            cats: cats,
            dogs: dogs
          }
        ))
      .catch(error => {
        console.error({ error })
      })

  }


  // removePerson = () => {

  //   fetch(`${config.API_ENDPOINT}/people`, {
  //     method: 'DELETE',
  //   });

  // }

  addPeople = (name) => {
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name })
    });
    this.setState({
      people: [...this.state.people, name]
    })
  }

  deletePeople = () => {
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
    });
    this.setState({
      people: this.state.people
    })
  }



  render() {
    console.log(this.state.people)
    const contextValue = {
      people: this.state.people,
      cats: this.state.cats,
      dogs: this.state.dogs,
      onAddPerson: this.addPeople,
      onDeletePerson: this.deletePeople

    }

    return (
      <div>
        <PetfulContext.Provider value={contextValue}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/adoption' component={Adoption} />
          </Switch>
        </PetfulContext.Provider>
      </div>
    )
  }
}

export default App

