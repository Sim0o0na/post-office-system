import React, { Component } from 'react'

const Footer = () => (
    <footer className="footer">
        <ul className="footer-company">
            <h3>Company</h3>
            <li>About</li>
            <li>Blog</li>
            <li>Legal</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
        </ul>
        <ul className="footer-services">
            <h3>Services</h3>
            <li>For Sellers</li>
            <li>For Customers</li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <ul className="footer-media">
            <span className="footer-media-icons">
                <li><i class="fab fa-twitter"></i></li>
                <li><i class="fab fa-facebook-f"></i></li>
                <li><i class="fab fa-apple"></i></li>
                <li><i class="fab fa-android"></i></li>
            </span>
            <p id="page-copyright-info">© SPS. site design / logo © 2019 Simona Simeonova Inc; licensed under bb cc-aa 3.0 1.0.0.0</p>
        </ul>
    </footer>
)

export default Footer;