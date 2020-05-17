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

  queuePerson = () => {
    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: `Test Person ${Math.floor(Math.random() * 100)}`,
      })

    })
      .then((res) => {
        if (res.status === 201) {
          return fetch(`${config.API_ENDPOINT}/people`)
            .then((data) => data.json())
            .then((result) => {
              this.setState({
                people: result,
              });
            });
        } else {
          throw new Error("The post request failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });;
  }

  deletePeople = () => {
    fetch(`${config.API_ENDPOINT}/people`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 201) {
          return fetch(`${config.API_ENDPOINT}/people`)
            .then((data) => data.json())
            .then((result) => {
              this.setState({
                people: result,
              });
            });
        } else {
          throw new Error("The delete request failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteDog = () => {
    fetch(`${config.API_ENDPOINT}/dogs`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 201) {
          return fetch(`${config.API_ENDPOINT}/dogs`)
            .then((data) => data.json())
            .then((result) => {
              this.setState({
                dogs: result,
              });
            });
        } else {
          throw new Error("The delete request failed")
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  deleteCat = () => {
    fetch(`${config.API_ENDPOINT}/cats`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 201) {
          fetch(`${config.API_ENDPOINT}/cats`)
            .then((data) => data.json())
            .then((result) => {
              this.setState({
                cats: result,
              });
            })
        } else {
          throw new Error("Delete request failed")
        }
      })
      .catch((err) => {
        console.err(err);
      })
  }





  render() {

    const contextValue = {
      people: this.state.people,
      cats: this.state.cats,
      dogs: this.state.dogs,
      onAddPerson: this.addPeople,
      onDeletePerson: this.deletePeople,
      onDeleteDog: this.deleteDog,
      onDeleteCat: this.deleteCat,
      onQueuePerson: this.queuePerson
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

