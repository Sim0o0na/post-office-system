import React, { Component } from 'react'
import axios from 'axios';


export function logoutHandler() {
    let token = localStorage.getItem('jwt')
    if (token) {
        localStorage.removeItem('jwt')
        axios.defaults.headers.common['Authorization'] = undefined;
    }
}

export default LogoutHandler;