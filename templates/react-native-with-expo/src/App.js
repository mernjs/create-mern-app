
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './Store';
import ThemeProvider from './Theme'
import Toast from 'react-native-toast-message'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

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
						<Stack.Navigator 
							initialRouteName="Dashboard" 
							screenOptions={{
						      cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
						    }}
						>
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
							<Stack.Screen 
								name="Login" 
								component={Login} 
								options={({ navigation, route }) => ({
									title: 'Login',
									headerShown: false,
									headerTintColor: 'white',
									transitionSpec: {
								      	open: config,
								      	close: config,
								    }
								})}
							/>
							<Stack.Screen 
								name="Signup" 
								component={Signup} 
								options={({ navigation, route }) => ({
									title: 'Signup',
									headerShown: false,
									headerTintColor: 'white',
									transitionSpec: {
								      	open: config,
								      	close: config,
								    }
								})}
							/>
						</Stack.Navigator>
						
						<Toast position='bottom' bottomOffset={20} />
					</NavigationContainer>
				</ThemeProvider>
          	</Provider>
		)
}

export default App