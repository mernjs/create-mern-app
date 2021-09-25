import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { all } from "redux-saga/effects";
import { reducer as formReducer } from "redux-form";

//reducers
import WelcomeReducer from './reducers/WelcomeReducer';


//sagas
import WelcomeSagas from './sagas/WelcomeSagas';

function* rootSaga() {
	yield all([WelcomeSagas()])
}

const rootReducer = combineReducers({
	form : formReducer,
	welcome : WelcomeReducer
})

const reduxLogger = createLogger();
const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(sagaMiddleware, reduxLogger)

export const makeStore = initialState => {
	let store =  createStore(rootReducer, initialState, middleware)
	sagaMiddleware.run(rootSaga)
	return store
}