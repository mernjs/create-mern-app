import React from 'react';
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { history } from './Utilities';
import { useSelector } from 'react-redux'

import Home from './pages/Home'
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

const Routing = () => {
    const user = useSelector(state => state.auth.user)
	return (
        <Router history={history}>
            <Routes>
                <Route exact={true} path="/*" element={user ? <Dashboard/> : <Home/>} />
                  {/* <Route exact={true} path="/" element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                } /> */}
                <Route exact={true} path="/" element={<Home/>}/>
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

export default Routing;