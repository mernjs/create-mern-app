import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'src/core/reducers';
import rootSaga from 'src/core/sagas';

const reduxLogger = createLogger();
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, reduxLogger));

sagaMiddleware.run(rootSaga)

export default store