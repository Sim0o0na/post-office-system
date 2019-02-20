import React, { Component } from 'react'

export default class LoginForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            
            errors: {
                username: false,
                password: false,
                email: false,
                firstName: false,
                lastName: false
            }
        }

        this.onInputValueChange = this.onInputValueChange.bind(this)
    }

    onInputValueChange (e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    

    render() {
        return (
            <form className="user-form">
                <h1>Register</h1>
                <label htmlFor="username"><p>Username:</p><input onChange={this.onInputValueChange} type="text" name="username" required/><p>{this.state.username}</p></label>
                <label htmlFor="password"><p>Password:</p><input type="password" name="password" required/></label>
                <label htmlFor="confirmPassword"><p>Confirm Password:</p><input type="password" name="confirmPassword" required/></label>
                <label htmlFor="email"><p>Email:</p><input type="email" name="email" /></label>
                <label htmlFor=""><p>First Name:</p><input type="text" name="firstName" /></label>
                <label htmlFor=""><p>Last Name:</p><input type="text" name="lastName" /></label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}