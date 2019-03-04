import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/home'
import LoginForm from './components/forms/login-form'
import RegisterForm from './components/forms/register-form'

const AppRouter = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/register' component={RegisterForm}/>
    </Switch>
)

export default AppRouter;