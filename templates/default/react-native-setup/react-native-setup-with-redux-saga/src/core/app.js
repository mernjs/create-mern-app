import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'src/core/store';
import Routes from 'src/core/routes';

export default class App extends Component {
    render() {
        return  (
          	<Provider store={store}> 
            	<Routes/> 
          	</Provider>
        )
    }
}