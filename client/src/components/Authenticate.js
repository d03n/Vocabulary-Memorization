import { Redirect, Route } from 'react-router-dom';

import React from 'react';

// Simple check for auth
const isAuthenticated = () => {
    return localStorage.getItem('token');
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    )} />
);

export {PrivateRoute};
