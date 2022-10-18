import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from "./utils/Store";

import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { history } from './utils/Utilities';
import { useSelector } from 'react-redux'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

const AuthRoute = ({ children }) => {
	const user = useSelector(state => state.auth.user)
    return (user !== null) ? <Navigate to='/dashboard' /> : children
}

const PrivateRoute = ({ children }) => {
	const user = useSelector(state => state.auth.user)
    return (user !== null) ? children : <Navigate to={{ pathname: '/login' }} />
}

const AppRoutes = () => {
    const user = useSelector(state => state.auth.user)
	return (
        <Router history={history}>
            <Routes>
                <Route exact={true} path="/" element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                } />
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
            </Routes>
        </Router>
	)
}

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppRoutes/>
				<ToastContainer/>
			</PersistGate>
		</Provider>
	)
}

export default App;