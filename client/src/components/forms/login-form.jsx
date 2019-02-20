import React, { Component } from 'react'

export default class LoginForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <form className="user-form">
                <h1>Login</h1>
                <label htmlFor="username"><p>Username:</p><input type="text" name="username"/></label>
                <label htmlFor="password"><p>Password:</p><input type="text" name="password"/></label>
                <input type="submit" value="Submit" /> 
            </form>
        )
    }
}