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
import { apiCall } from '@/services/apiCall';
import CoreReducer from '@/reducers/CoreReducer';
import AuthReducer from '@/reducers/AuthReducer';
import UserReducer from '@/reducers/UserReducer';

const appReducer = combineReducers({
	core: CoreReducer,
	auth: AuthReducer,
	user: UserReducer,
	[apiCall.reducerPath]: apiCall.reducer,
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
	blacklist: ['apiCall'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const reduxLogger = createLogger();

const configureCustomStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiCall.middleware, reduxLogger),
		devTools: process.env.NODE_ENV !== 'production',
	});
	const persistor = persistStore(store);
	return { store, persistor };
};

export default configureCustomStore();

export const { store, persistor } = configureCustomStore();