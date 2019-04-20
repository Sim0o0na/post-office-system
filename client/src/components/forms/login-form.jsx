import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { user_login_post } from './../../globals'
import setAuthorizationToken from './../../helpers/auth'

export default class LoginForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        let self = this
        fetch(user_login_post, {
            method: 'POST',
            body: data,
        })
        .then(function(res){ return res.json(); })
        .then(function(data){ 
            console.log(data)
            self.setState({ generalMsg: data.message})
            if (data.status === 200) {
                localStorage.setItem('jwt', data.access_token)
                setAuthorizationToken(data.access_token)
                self.props.history.push("/");
            }
        })
    }

    render() {
        return (
            <Fragment>
                <form className="user-form" onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <p>Don't have a profile? <Link to="/register">Register</Link></p>
                    <label htmlFor="username"><p>Username:</p><input type="text" name="username"/></label>
                    <label htmlFor="password"><p>Password:</p><input type="text" name="password"/></label>
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
        )
    }
}