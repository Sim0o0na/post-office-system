import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const Header = () => (
    <header className="page-header">
        <nav>
            <div>SPS</div>
            <div className="header-controls">
                <ul className="header-nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
        </nav>
    </header>
)

export default Header;