import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <main>
                    <header>
                        <h1>Welcome to the Petful Adoption Page</h1>
                    </header>
                    <p>
                        We are Petful! The FIFO adoption organization!
                    </p>
                    <Link to="/adoption">
                        <button type="button">Enter site</button>
                    </Link>
                </main>
            </div>
        )
    }
}
