import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "utils/Store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from "react-redux";
import AdminLTE, { Sidebar, Navbar } from 'adminlte-2-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Footer from 'components/Footer';
import { AuthActions } from 'reducers/AuthReducer'

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

const AppRoutes = () => {
	const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    
    const logout = () => {
        dispatch(AuthActions.logout())
    }
	return (
        <>
            {user === null ?
                <Router>
                    <Switch>
                        <PrivateRoute path={"/"} exact component={Dashboard} /> 
                        <AuthRoute path={"/login"} exact component={Login} />
                        <AuthRoute path={"/signup"} exact component={Signup} /> 
                    </Switch>
                </Router>
                :
                <AdminLTE theme="blue" footer={<Footer/> }>
                    <Navbar.Core>
                        <Sidebar.Item icon="fa-user" text={user?.email || ''} to="/" />
                        <Navbar.Entry onClick={logout} icon="fas-power-off"/>
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
            }
        </>
        
	)
}

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppRoutes/>
				<ToastContainer />
			</PersistGate>
		</Provider>
	)
}

export default App;