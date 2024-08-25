import React from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import Color from './components/Color';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
    <div className="flex flex-col h-screen bg-gray-200">
      <header className="bg-gray-800 text-white text-center py-2">
        Paintbrush
      </header>
      <div className="flex flex-1">
        <Toolbar />
        <Canvas />
        <Color />
      </div>
      <footer className="bg-gray-800 text-white text-center py-2">
        © Copyright 2024 Paintbrush.
      </footer>
    </div>
    </Provider>
  );
}

export default App;
