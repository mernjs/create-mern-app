import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "Store";
import ThemeProvider from 'Theme'
import AdminLTELayout from 'AdminLTELayout';

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<AdminLTELayout/>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default App;