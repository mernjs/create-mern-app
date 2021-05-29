import React                    from 'react';
import { createMemoryHistory }  from 'history';
import { Route, Redirect }      from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history'
import { RouteComponentProps } from "react-router-dom";

export const history = typeof window === 'undefined'? createMemoryHistory() : createHistory();

const PrivateRoute = (theProps: { path: string, component: React.SFC<RouteComponentProps<any> | undefined> | React.ComponentClass<RouteComponentProps<any> | undefined> }) => {
    return <Route path={theProps.path} render={props => (
        localStorage.getItem('user') 
        ? <React.Component {...theProps} /> 
        : <Redirect to={{pathname: '/login', state: { from: props.location } }} />
    )} />
}