import React, { Component } from 'react';
import { Root } from 'native-base'
import AppNavigator from '../routes/Routes'

class Routes extends Component {
    render() {
        return <Root> 
			<AppNavigator /> 
		</Root>
    }
}

export default Routes