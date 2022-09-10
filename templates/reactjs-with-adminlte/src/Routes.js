import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import Signup from 'pages/Signup';
import Users from 'pages/Users';
import NotFound from 'pages/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(state => state.auth.user)
	return <Route {...rest} render={(props) => (
        (user !== null)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
}

const AuthRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(state => state.auth.user)
	return <Route {...rest} render={(props) => (
        (user !== null) ? <Redirect to='/' /> : <Component {...props} />
    )} />
}

const Routes = () => {
	return (
        <>
            <PrivateRoute path={"/"} exact component={Dashboard} /> 
            <AuthRoute path={"/login"} exact component={Login} />
            <AuthRoute path={"/signup"} exact component={Signup} /> 
            <PrivateRoute path={"/users"} exact component={Users} /> 
            <Route path={"*"} exact component={NotFound}/>
        </>
        
	)
}

export default Routes;