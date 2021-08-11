import React                    from 'react';
import { createMemoryHistory }  from 'history';
import { Route, Redirect }      from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history'

export const history = typeof window === 'undefined'? createMemoryHistory() : createHistory();

export const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)


export const partStr = (data: number):string => {
      return 'hello';
}