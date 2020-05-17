import React, { Component } from 'react';
import PetFulContext from './PetfulContext';

let count = 0;

export default class Cat extends Component {
    static contextType = PetFulContext


    showCat = () => {
        const { age,
            breed,
            description,
            gender,
            imageURL,
            name,
            story } = this.context.cats

        if (this.context.cats) {
            if (count === 20) {
                return <p>No More Cats</p>
            }
            return (
                <div className="pet">
                    <h2>{name}</h2>
                    <img src={imageURL} alt="Cat up for adoption" />
                    <p>Age: {age}</p>
                    <p>Breed: {breed}</p>
                    <p>Gender: {gender}</p>
                    <p>Description: {description}</p>
                    <p>Story: {story}</p>
                    {this.props.adopt && <button onClick={() => this.context.onDeleteCat()}>Adopt Cat</button>}
                    <p>{count++}</p>
                </div>
            )

        }
    }

    render() {
        // const { age,
        //     breed,
        //     description,
        //     gender,
        //     imageURL,
        //     name,
        //     story } = this.context.cats

        return (
            <p>{this.showCat()}</p>
            // <div className="pet">
            //     <h2>{name}</h2>
            //     <img src={imageURL} alt="Cat up for adoption" />
            //     <p>Age: {age}</p>
            //     <p>Breed: {breed}</p>
            //     <p>Gender: {gender}</p>
            //     <p>Description: {description}</p>
            //     <p>Story: {story}</p>
            //     {this.props.adopt && <button onClick={() => this.context.onDeleteCat()}>Adopt Cat</button>}
            // </div>
        )
    }
}

