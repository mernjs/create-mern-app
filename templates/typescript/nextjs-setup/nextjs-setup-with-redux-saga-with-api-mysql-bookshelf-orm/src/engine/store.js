import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

const reduxLogger = createLogger();
const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(sagaMiddleware, reduxLogger)

export const makeStore = initialState => {
	let store =  createStore(rootReducer, initialState, middleware)
	sagaMiddleware.run(rootSaga)
	return store
}