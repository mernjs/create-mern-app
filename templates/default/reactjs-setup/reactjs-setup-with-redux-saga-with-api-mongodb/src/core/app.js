import React, { Component } from 'react';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as Helpers from '../helpers/helpers';
import Routes from './routes';
import '../views/assets/css/app.css'

class App extends Component {
  	render() {
    	return (<Provider store={store}>
					<Router history={Helpers.history}>
						<Routes/>
					</Router>
				</Provider>
    	)
  	}
}

export default App;