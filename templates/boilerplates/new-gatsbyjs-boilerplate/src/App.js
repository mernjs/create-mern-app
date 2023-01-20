import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Store';

const App = ({ element }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {element}
        </PersistGate>
    </Provider>
);

export default App;
