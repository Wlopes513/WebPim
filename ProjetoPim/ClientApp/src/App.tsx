import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Employee from './components/Employee';
import RegisterEmployee from './components/RegisterEmployee';
import { sessionGet } from './utils/session';

import './scss/style.scss';

export default () => {
    const alreadyLogged = sessionGet("isLogged");

    if (!alreadyLogged && window.location.pathname !== "/login") {
        window.open("/login", "_self");
    }

    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/funcionarios' component={Employee} />
            <Route exact path='/funcionarios/incluir-funcionario' component={RegisterEmployee} />
        </Layout>
    )
};
