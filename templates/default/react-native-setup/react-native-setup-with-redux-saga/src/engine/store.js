import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'src/engine/reducers';
import rootSaga from 'src/engine/sagas';

const reduxLogger = createLogger();
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, reduxLogger));

sagaMiddleware.run(rootSaga)

export default store