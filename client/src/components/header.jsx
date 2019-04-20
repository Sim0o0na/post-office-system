import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './navigation';
import SecondaryNavigation from './secondary-navigation';

const Header = () => (
    <header className="page-header">
        <Navigation/>
        <SecondaryNavigation/>
    </header>
)

export default Header;