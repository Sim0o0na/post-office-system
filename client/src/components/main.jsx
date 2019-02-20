import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import LoginForm from './forms/login-form'
import RegisterForm from './forms/register-form'


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={LoginForm}/>
            <Route path='/register' component={RegisterForm}/>
        </Switch>
  </main>
)

export default Main;