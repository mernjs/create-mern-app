import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../engine/store';
import Routes from '../engine/routes';

export default class App extends Component {
    render() {
        return  (
          	<Provider store={store}> 
            	<Routes/> 
          	</Provider>
        )
    }
}