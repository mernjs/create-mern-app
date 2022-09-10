import React from 'react';
import { Provider, useSelector } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "Store";
import ThemeProvider from 'Theme'
import AdminLTE, { Sidebar, Navbar } from 'adminlte-2-react';
import { Route, Redirect } from 'react-router-dom';

import Header  from 'components/Header';
import Footer from 'components/Footer';

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

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<AdminLTE theme="blue" footer={<Footer/> }>
						<Navbar.Core>
							<Header/>
						</Navbar.Core>
						<Sidebar.Core>
							<Sidebar.Item icon="fa-tachometer-alt" text="Dashboard" to="/" />
							<Sidebar.Header text="MAIN NAVIGATION"/>
							<Sidebar.Item active text="Users" icon="fa-user" to="/users" />
						</Sidebar.Core>
						<PrivateRoute path={"/"} exact component={Dashboard} /> 
						<AuthRoute path={"/login"} exact component={Login} />
						<AuthRoute path={"/signup"} exact component={Signup} /> 
						<PrivateRoute path={"/users"} exact component={Users} /> 
						<Route path={"*"} exact component={NotFound}/>
					</AdminLTE>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default App;