import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import CoreReducer from './reducers/CoreReducer';
import AuthReducer from './reducers/AuthReducer';

const appReducer = combineReducers({
  core: CoreReducer,
  auth: AuthReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'AuthReducer/logout') {
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const reduxLogger = createLogger();
const middleware = [reduxLogger];

export const makeStore = (initialState) => {
  const store = configureStore({
    reducer: persistedReducer,
    initialState: initialState,
    middleware: [...middleware],
    devTools: process.env.NODE_ENV !== 'production',
  });
  store.__PERSISTOR = persistStore(store);
  return store;
};

export default makeStore();
