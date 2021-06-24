import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer, { IAppState } from './reducers';

const reduxLogger = createLogger();

function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, reduxLogger))
  return store;
}

export default configureStore();