import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Employee from './components/Employee';

import './scss/style.scss';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/funcionarios' component={Employee} />
    </Layout>
);
