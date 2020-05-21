import React, { Component } from 'react';

export default class LoginScreen extends Component {
    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <nav className="navbar navbar-navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                        <h3><span className="navbar-brand mb-0 badge">Welcome to goLogoLo!</span></h3>
                    </nav>
                    <div className="panel-heading row h-100 p-3">
                        <h4>Login</h4>
                    </div>
                    <div className="container row h-100 p-3">
                        <a href="http://localhost:3000/auth/google"
                            className="btn btn-primary"
                            role="button"
                            aria-pressed="true">
                            Sign in with google</a>
                    </div>
                </div>
            </div>
        )
    }
}