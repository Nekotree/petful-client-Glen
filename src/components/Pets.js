import React, { Component } from "react";
import PetfulContext from "./PetfulContext";
import { Link } from 'react-router-dom';

export default class Main extends Component {
    static contextType = PetfulContext;

    render() {
        let cat = this.context.cats || [];
        let dog = this.context.dogs || [];
        console.log(this.context);

        return (
            <div>
                <main>
                    <header>
                        <h1>A current selection of our cats and dogs!</h1>
                    </header>

                    <h2>Cats</h2>

                    <div className="cat-display">
                        <p>Name: {cat.name}</p>
                        <p>Age: {cat.age}</p>
                        <p>Breed: {cat.breed}</p>
                        <p>Description: {cat.description}</p>
                        <p>Gender: {cat.gender}</p>
                        <img src={cat.imageURL} alt="" />
                        <p>Story: {cat.story}</p>
                    </div>

                    <h1>Dogs</h1>

                    <div className="dog-display">
                        <p>Name: {dog.name}</p>
                        <p>Age: {dog.age}</p>
                        <p>Breed: {dog.breed}</p>
                        <p>Description: {dog.description}</p>
                        <p>Gender: {dog.gender}</p>
                        <img src={dog.imageURL} alt="" />
                        <p>Story: {dog.story}</p>
                    </div>
                    <Link to="/adoption-form">
                        <button type="button">Add your name</button>
                    </Link>
                </main>
            </div>
        );
    }
}
