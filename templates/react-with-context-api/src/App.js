import React from 'react';
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Provider, { useStore } from "Store";
import { history } from 'Utilities';
import ThemeProvider from 'Theme'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import Dashboard from 'pages/Dashboard'
import NotFound from 'pages/NotFound'

// const AuthRoute = ({ component: Component, ...rest }) => {
// 	const [state, dispatch] = useStore();
//     const user = state.auth.user
//     return <Route {...rest} render={(props) => (
//         (user !== null)
//         	? <Redirect to='/dashboard' />
//             : <Component {...props}/>
//     )} />
// }

// const PrivateRoute = ({ component: Component, ...rest }) => {
// 	const [state, dispatch] = useStore();
//     const user = state.auth.user
//     return <Route {...rest} render={props => (
//         (user !== null)
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// }

const AuthRoute = ({ children }) => {
	const [state, dispatch] = useStore();
    const user = state.auth.user
    return (user !== null) ? <Navigate to='/dashboard' /> : children
}

const PrivateRoute = ({ children }) => {
	const [state, dispatch] = useStore();
    const user = state.auth.user
    return (user !== null) ? children : <Navigate to={{ pathname: '/login' }} />
}

const App = () => {
	return (
		<Provider>
			<ThemeProvider>
					<Router history={history}>
						<Routes>
							<Route exact={true} path="/" element={<Home/>} />
							<Route exact={true} path="/login" element={
								<AuthRoute>
									<Login/>
								</AuthRoute>
							} />
							<Route exact={true} path="/signup" element={
								<AuthRoute>
									<Signup/>
								</AuthRoute>
							} />
							<Route exact={true} path="/dashboard" element={
								<PrivateRoute>
									<Dashboard/>
								</PrivateRoute>
							} />
							<Route path="*" element={<NotFound/>} />
						</Routes>
					</Router>
				</ThemeProvider>
		</Provider>
	)
}

export default App;