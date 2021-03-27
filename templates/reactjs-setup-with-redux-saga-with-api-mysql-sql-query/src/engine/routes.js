import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch }    from 'react-router-dom';
import * as Helpers      	from '../helpers/helpers'
import appRoutes 			from '../routes/Routes'

class Routes extends Component {
    
    render() {

    	let routes = [...appRoutes]

        return (<Router>
	        	<Switch>
					{ routes.map((route, i) => route.private === true ? <Helpers.PrivateRoute key={i} exact={true} {...route} /> : <Route key={i} exact={true} {...route} />)}
				</Switch>
			</Router>
        );
    }
}

export default  Routes