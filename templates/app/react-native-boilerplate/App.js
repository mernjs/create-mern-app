import React from 'react';
import { Provider } from 'react-redux';
import Routes from './src/Routes';
import { store } from './src/utils/Store';
import ThemeProvider from './src/utils/Theme';

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Routes />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
