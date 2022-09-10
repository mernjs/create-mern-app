import React from 'react';
import { useSelector } from "react-redux";
import AdminLTE, { Sidebar, Navbar } from 'adminlte-2-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import useAuth  from 'hooks/useAuth'
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

const AdminLTELayout = () => {
	const user = useSelector(state => state.auth.user)
    let { logout } = useAuth()
    
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

export default AdminLTELayout;