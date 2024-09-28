import React from 'react';
import ToolbarMenu from './components/ToolbarMenu';
import TwoDView from './components/TwoDView';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<div className="flex flex-col h-screen bg-gray-200">
				<header className="bg-gray-800 text-white text-center py-2">
					Wordrobe Builder
				</header>
				<div className="flex flex-1">
					<ToolbarMenu />
					<TwoDView />
				</div>
				<footer className="bg-gray-800 text-white text-center py-2">
					© Copyright 2024 Wordrobe Builder
				</footer>
			</div>
		</Provider>
	);
}

export default App;