import React, { Component, Suspense } from 'react';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as Helpers from '../helpers/helpers';
import Routes from './routes';
import '../views/assets/css/app.css'

console.log(process.env.REACT_APP_API_URL)


class App extends Component {
  	render() {
    	return (
			<Suspense fallback={<div>Loading...</div>}>
				<Provider store={store}>
					<Router history={Helpers.history}>
						<Routes/>
					</Router>
				</Provider>
			</Suspense>
    	)
  	}
}

export default App;