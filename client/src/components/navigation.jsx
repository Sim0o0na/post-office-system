import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logout from './../helpers/auth'


export default class Navigation extends Component {
    constructor(props) {
        super(props)
        
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        console.log('logout')
        localStorage.removeItem('jwt')
        this.forceUpdate();
    }

    render() {
        let isLoggedIn = false;
        console.log(localStorage.getItem('jwt') != null)
        if (localStorage.getItem('jwt') != null) {
            isLoggedIn = true;
        }
        if (isLoggedIn) {
            return (
                <nav className="primary-nav">
                    <div><Link to="/"><img src={"./header-logo.png"} id="navbar-logo"></img></Link></div>
                    <div className="header-controls">
                        <ul className="header-nav-list">
                            <li>My Profile</li>
                            <li onClick={this.handleLogout}>Logout</li>
                        </ul>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav className="primary-nav">
                    <div><Link to="/"><img src={"./header-logo.png"} id="navbar-logo"></img></Link></div>
                    <div className="header-controls">
                        <ul className="header-nav-list">
                            <li><Link to="/login">Login</Link></li>
                            <li className="bordered"><Link to="/register">Register</Link></li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }
}
