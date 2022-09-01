import React from 'react';
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const AuthRoute = ({ children }) => {
	const user = useSelector(state => state.auth.user)
    return (user !== null) ? <Navigate to='/dashboard' /> : children
}

const PrivateRoute = ({ children }) => {
	const user = useSelector(state => state.auth.user)
    return (user !== null) ? children : <Navigate to={{ pathname: '/login' }} />
}

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
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
			</PersistGate>
		</Provider>
	)
}

export default App;