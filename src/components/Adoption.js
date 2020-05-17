import React, { Component } from 'react';
import PetfulContext from './PetfulContext';
import AdoptForm from './AdoptForm';

export default class Adoption extends Component {

    static contextType = PetfulContext;

    state = {
        people: [],
        currentUser: ''
    }

    componentDidMount = () => {
        this.moveLine()
    }


    addPerson = (person) => {
        // this.setState({ people: [...(this.state.people || []), person] })
        this.setState({
            currentUser: person
        })
    }

    moveLine = () => {

        this.context.onDeletePerson();
        this.setState({
            people: this.context.people
        })

    }



    render() {

        let cat = this.context.cats || []
        let dog = this.context.dogs || []
        let people = this.context.people || []
        // console.log(this.context.cats)
        // console.log(this.context.dogs)
        console.log(this.state.people)

        return (
            <div>
                <h1>Get Ready to Adopt!</h1>
                <p>The following people are in line for adoption</p>
                <ul>
                    {people.map(person =>
                        <li key={person + Math.random()}>
                            {person}
                        </li>
                    )}
                </ul>
                {!this.state.currentUser && (
                    <AdoptForm add={this.addPerson}
                        waitingLine={this.moveLine}
                    />
                )}


                {this.state.currentUser && (
                    <p>
                        Excellent! Please wait in line. When your name appears, you will be able to adopt a pet!
                    </p>
                )}
                {}



            </div>
        )
    }
}
