import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LoginScreen extends Component {
    render() {
        return (
            <div className="container">
                <Link id="x" to="/" className={"btn btn-secondary btn-block"}>Go Home</Link>
                <a className="google-btn" href="http://localhost:3000/auth/google">Google+</a>
            </div>
        )
    }
}