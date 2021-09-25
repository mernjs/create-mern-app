import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Switch }    from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./Store";
import { history } from './Utilities';

import Welcome from './pages/Welcome'
import Page404 from './pages/Page404'


class App extends Component {
  	render() {
    	return (
			<Provider store={store}>
				<Router history={history}>
					<BrowserRouter>
			        	<Switch>
							<Route exact={true} path="/" component={Welcome} /> 
							<Route exact={true} path="*" component={Page404} />)
						</Switch>
					</BrowserRouter>
				</Router>
			</Provider>
    	)
  	}
}

export default App;