import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Provider, { useStore } from "Store";
import { history } from 'Utilities';
import ThemeProvider from 'Theme'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import Dashboard from 'pages/Dashboard'
import NotFound from 'pages/NotFound'

const AuthRoute = ({ component: Component, ...rest }) => {
	const [state, dispatch] = useStore();
    const user = state.auth.user
    return <Route {...rest} render={(props) => (
        (user !== null)
        	? <Redirect to='/dashboard' />
            : <Component {...props}/>
    )} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [state, dispatch] = useStore();
    const user = state.auth.user
    return <Route {...rest} render={props => (
        (user !== null)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
}

const App = () => {
	return (
		<Provider>
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
		</Provider>
	)
}

export default App;