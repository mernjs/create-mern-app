import React from 'react';
import {  Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./Store";
import ThemeProvider from './Theme'
import { useSelector } from 'react-redux'
import Routes from './Routes'


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
					<Routes/>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default App;