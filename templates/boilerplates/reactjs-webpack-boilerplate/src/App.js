import React from 'react';
import { Provider, useSelector } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { history } from './Utilities';
import { store, persistor } from "./Store";

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound';

const AuthRoute = ({ children }) => {
	const user = useSelector(state => state.auth.user)
    return (user !== null) ? <Navigate to='/' /> : children
}

const PrivateRoute = ({ children }) => {
	const user = useSelector(state => state.auth.user)
    return (user !== null) ? children : <Navigate to={{ pathname: '/login' }} />
}

const AppRoutes = () => {
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
                <Route exact={true} path="*" element={
                    <NotFound/>
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