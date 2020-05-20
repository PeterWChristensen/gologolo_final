import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginScreen extends Component {


    render() {

        return (
            <div className="container"> 
                <div className="row">
                    <div className="col-md- mt-5 / mr-5">
                        <h1> User Login</h1>
                        <input type="text" placeholder="Username"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <input type="text" placeholder="Password"></input>
                </div>
                <div className="row mt-3">
                <button>
                    <Link to="/home" style={{ textDecoration: 'none', color: "#000000" }}>Submit</Link>
                </button> 
                </div>
                <div className="row mt-3"> Don't have an account?
                <div className="col">
                <button>
                    <Link to="/register" style={{ textDecoration: 'none', color: "#000000" }}>Make One!</Link>
                </button> 
                </div>
                </div>
            </div>
        );
    }
}
export default LoginScreen;