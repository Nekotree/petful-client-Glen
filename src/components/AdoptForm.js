import React, { Component } from 'react';
import PetfulContext from './PetfulContext';

export default class AdoptForm extends Component {

    state = {
        name: ''
    }

    handleSubmit = e => {
        e.preventDefault();
        let name = this.state.name;
        this.context.onAddPerson(name);
        this.props.add(name)
        // this.props.waitingLine();
        this.setState({
            name: ''
        })
    }


    static contextType = PetfulContext;

    render() {
        let people = this.context.people || []
        // console.log(people)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Please wait in line for your turn to adopt</h2>
                    <p>Enter your info below and click submit to wait in line</p>
                    <label htmlFor="name">Please enter name</label>
                    <input type="text" id="name" name="name" value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })} />
                    <button type="submit">Submit name</button>
                </form>
            </div>
        )
    }
}
