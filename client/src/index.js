import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import setAuthorizationToken from './helpers/auth'

// setAuthorizationToken(localStorage.jwt)

ReactDOM.render((
        <BrowserRouter>
            <App />
        </BrowserRouter>), 
        document.getElementById('root')
    );
    
serviceWorker.unregister();
