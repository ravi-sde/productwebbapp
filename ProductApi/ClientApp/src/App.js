import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Home from './components/Pages/Home';
import AddUser from './components/Products/AddProduct';

import { GraphData } from './components/Pages/GraphData';
import { withAuth } from './msal/MsalAuthProvider';

import './custom.css'
import EditUser from './components/Products/EditProduct';
import User from './components/Products/Product';

class RootApp extends Component {
    render() {
        return (
            <Layout {...this.props}>
                <Route exact path='/' component={Home} />
                <Route exact path='/graph-data' component={GraphData} />
                <Route exact path='/products' component={AddUser} />
                <Route exact path='/products/edit/:id' component={EditUser} />
                <Route exact path='/products/:id' component={User} />
            </Layout>
        );
    }
}
export const App = withAuth(RootApp);