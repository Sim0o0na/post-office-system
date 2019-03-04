import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

class RegisterForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            generalMsg: "",
            username: { value: '', isValid: false, message: ''},
            password: { value: '', isValid: false, message: ''},
            confirmPassword: { value: '', isValid: false, message: ''},
            email: { value: '', isValid: false, message: ''},
            firstName: { value: '', message: ''},
            lastName: { value: '',  message: ''},
            isFormValid: false
        }

        this.onInputValueChange = this.onInputValueChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onInputValueChange (e) {
        let name = e.target.name
        let value = e.target.value
        this.validateField(name, value);
        this.validateForm();
    }

    validateForm() {
        let currIsFormValid = true;
        Object.keys(this.state).map((stateObj) => {
            if (this.state[stateObj].isValid === false) {
                currIsFormValid = false;
            }
        })
        this.setState({ isFormValid : currIsFormValid });
    }

    validateField(fieldName, fieldValue) {
        switch(fieldName) {
            case 'username':
                let usernameValid = fieldValue.length >= 3;
                this.setInputValuesToState(usernameValid, 
                    fieldName, fieldValue, 
                    fieldValue + " is an invalid username!");
                break;
            case 'password':
                let passwordValid = fieldValue.length >= 3;
                this.setInputValuesToState(passwordValid, fieldName, fieldValue, "Invalid password!");
                break;
            case 'confirmPassword':
                let confirmPasswordValid = fieldValue.length >= 3 && fieldValue === this.state.password.value;
                this.setInputValuesToState(confirmPasswordValid, fieldName, fieldValue, "Confirm password doesn't match!");
                break;
            case 'email':
                let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                let emailValid = pattern.test(fieldValue);
                this.setInputValuesToState(emailValid, fieldName, fieldValue, "Invalid email!")
            default:
                break;
        }
    }

    setInputValuesToState(isInputValid, inputName, inputValue, message) {
        let stateObjByInputName = this.state[inputName];
        stateObjByInputName.value = inputValue;
        stateObjByInputName.isValid = isInputValid;
        isInputValid ? stateObjByInputName.message = "" : stateObjByInputName.message = message;

        this.setState({[inputName]: stateObjByInputName});
    }

    handleSubmit (e) {
        e.preventDefault();
        if (!this.state.isFormValid) {
            this.setState({generalMsg: "Please fill all fields correctly!"});
            return;
        }
        const data = new FormData(e.target);
        let self = this
        fetch('http://localhost:8888/users/register', {
            method: 'POST',
            body: data,
        })
        .then(function(res){ return res.json(); })
        .then(function(data){ 
            self.setState({ generalMsg: data.message});
            self.props.history.push("/login");
        })
    }

    render() {
        return (
            <form className="user-form" onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                <p>{this.state.generalMsg}</p>
                <label htmlFor="username" className={this.state.username.isValid ? '' : 'error-form-group'}>
                    <p>Username:</p>
                    <input onChange={this.onInputValueChange} type="text" name="username" required/>
                    <p>{this.state.username.message}</p>
                </label>
                <label htmlFor="password" className={this.state.password.isValid ? '' : 'error-form-group'}>
                    <p>Password:</p>
                    <input type="password" onChange={this.onInputValueChange} name="password" required/>
                    <p>{this.state.password.message}</p>
                </label>
                <label htmlFor="confirmPassword" className={this.state.confirmPassword.isValid ? '' : 'error-form-group'} >
                    <p>Confirm Password:</p>
                    <input type="password" onChange={this.onInputValueChange} name="confirmPassword" required/>
                    <p>{this.state.confirmPassword.message}</p>
                </label>
                <label htmlFor="email" className={this.state.email.isValid ? '' : 'error-form-group'}>
                    <p>Email:</p>
                    <input type="email" onChange={this.onInputValueChange} name="email" required/>
                    <p>{this.state.email.message}</p>
                </label>
                <label htmlFor="">
                    <p>First Name:</p>
                    <input type="text" name="firstName" />
                </label>
                <label htmlFor="">
                    <p>Last Name:</p>
                    <input type="text" name="lastName" />
                </label>
                <input type="submit" className={this.state.isFormValid === true ? 'form-button-active' : ''} value="Submit"/>
            </form>
        )
    }
}

export default withRouter(RegisterForm);