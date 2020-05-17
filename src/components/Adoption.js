import React, { Component } from 'react';
import PetfulContext from './PetfulContext';
import AdoptForm from './AdoptForm';
import Dog from './Dog';
import Cat from './Cat';

export default class Adoption extends Component {

    static contextType = PetfulContext;

    state = {
        currentUser: '',
        userCanAdopt: false,
        interval: null,
    }

    componentWillUnmount = () => {
        clearInterval(this.state.interval);
    };


    addPerson = (person) => {
        this.setState({
            currentUser: person
        })
    }

    getInLine = () => {

        const interval = setInterval(() => {
            this.context.onDeletePerson();
            this.context.onQueuePerson();
            this.context.onDeleteDog();
            this.lineMoving();
        }, 2000);
        this.setState({
            interval
        })

        //every five seconds a new user is added to the back of the line until there is a total of five users
        //if the line is less than 5 users, every five seconds, add someone to the line until the length of the line is 5

    }


    lineMoving = () => {
        if (this.context.people[1] === this.state.currentUser) {
            clearInterval(this.state.interval);
            this.setState({
                userCanAdopt: true
            });
        };

    }


    render() {
        return (
            <div>
                <h1>Get Ready to Adopt!</h1>
                <p>The following people are in line for adoption</p>
                <ul>
                    {this.context.people.map(person =>
                        <li key={this.context.people + Math.random()}>
                            {person}
                        </li>
                    )}
                </ul>
                {!this.state.currentUser && (
                    <AdoptForm add={this.addPerson}
                        queueLine={this.getInLine}
                    />
                )}

                {this.state.currentUser && (
                    <p>
                        Excellent! Please wait in line. When your name appears, you will be able to adopt a pet!
                    </p>
                )}
                {this.state.userCanAdopt && <h2>Your turn!</h2>}
                <Dog adopt={this.state.userCanAdopt} />
                <Cat adopt={this.state.userCanAdopt} />

            </div>
        )
    }
}
