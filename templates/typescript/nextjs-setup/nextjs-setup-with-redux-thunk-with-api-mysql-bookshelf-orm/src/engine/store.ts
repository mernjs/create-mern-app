import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const reduxLogger = createLogger();

const middleware =  applyMiddleware(thunkMiddleware, reduxLogger)

export const makeStore = (initialState: any) => {
	return createStore(rootReducer, initialState, middleware)
}