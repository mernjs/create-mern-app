
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'app/Store';
import ThemeProvider from 'app/Theme'
import Toast from 'react-native-toast-message'

import Dashboard from 'app/views/pages/Dashboard'

const Stack = createStackNavigator();
const config = {
  	animation: 'none',
  	config: {
    	stiffness: 1000,
    	damping: 0.00,
    	mass: 3,
    	overshootClamping: true,
    	restDisplacementThreshold: 0.01,
    	restSpeedThreshold: 0.01,
  	},
};

const App = () => {
		return (
			<Provider store={store}>
				<ThemeProvider> 
					<NavigationContainer>
						<StatusBar translucent backgroundColor={'#4c84ff'} barStyle="light-content" />
						<Stack.Navigator initialRouteName="Dashboard">
							<Stack.Screen 
								name="Dashboard" 
								component={Dashboard} 
								options={({ navigation, route }) => ({
									title: 'Dashboard',
									headerShown: false,
									headerTintColor: 'white',
									transitionSpec: {
								      	open: config,
								      	close: config,
								    }
								})}
							/>
						</Stack.Navigator>
						<Toast ref={(ref) => Toast.setRef(ref)} />
					</NavigationContainer>
				</ThemeProvider>
          	</Provider>
		)
}

export default App