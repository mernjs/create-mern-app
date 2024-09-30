import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { api } from './services/api';
import AuthReducer from './reducers/AuthReducer';

const appReducer = combineReducers({
	auth: AuthReducer,
	[api.reducerPath]: api.reducer,
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
	blacklist: ['api'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const reduxLogger = createLogger();

const configureCustomStore = () => {
	const middlewares = [api.middleware];
	const isDebugMode = process.env.REACT_APP_DEBUG === 'true';

	if (isDebugMode) {
		middlewares.push(reduxLogger);
	}

	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(middlewares),
		devTools: isDebugMode,
	});

	const persistor = persistStore(store);
	return { store, persistor };
};

export default configureCustomStore();

export const { store, persistor } = configureCustomStore();
