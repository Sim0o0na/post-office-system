import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const SecondaryNavigation = () => (
    <nav className="secondary-nav">
        <ul>
            <li>Couriers</li>
            <li>Pricing</li>
            <li>Projects</li>
            <li>Offices</li>
            <li className="link-active">Policy</li>
        </ul>
    </nav>
)

export default SecondaryNavigation;