import React, { Fragment } from 'react'
import Header from './header';
import Footer from './footer';
import AppRouter from '../AppRouter'

const Main = () => (
    <Fragment>
        <Header/>
        <main>
            <AppRouter/>
        </main>
        <Footer/>
    </Fragment>
)

export default Main;