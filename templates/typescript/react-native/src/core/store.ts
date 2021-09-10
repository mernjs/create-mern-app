import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer, { IAppState } from './reducers';
import rootSaga from './sagas';

const reduxLogger = createLogger();
const sagaMiddleware = createSagaMiddleware()

function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, reduxLogger))
  sagaMiddleware.run(rootSaga)
  return store;
}

export default configureStore();