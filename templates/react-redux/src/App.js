import React from 'react';
import {  BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "Store";
import { history } from 'Utilities';
import ThemeProvider from 'Theme'
import { useSelector } from 'react-redux'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import Dashboard from 'pages/Dashboard'
import NotFound from 'pages/NotFound'

const AuthRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(state => state.auth.user)
    return <Route {...rest} render={(props) => (
        (user !== null)
        	? <Redirect to='/dashboard' />
            : <Component {...props}/>
    )} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(state => state.auth.user)
    return <Route {...rest} render={props => (
        (user !== null)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
}

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<Router history={history}>
						<Switch>
							<Route exact={true} path="/" component={Home} />
							<AuthRoute exact={true} path="/login" component={Login} />
							<AuthRoute exact={true} path="/signup" component={Signup} />
							<PrivateRoute exact={true} path="/dashboard" component={Dashboard} />
							<Route path="*" component={NotFound} />
						</Switch>
					</Router>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default App;