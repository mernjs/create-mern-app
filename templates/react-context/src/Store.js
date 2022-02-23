import React, { createContext, useContext, useReducer } from 'react';
import logger from 'use-reducer-logger';
import AuthReducer from 'reducers/AuthReducer';
import CoreReducer from 'reducers/CoreReducer';

const applyMiddleware = dispatch => action => {
    dispatch(action);
}

const reducers = {
    core: CoreReducer,
    auth: AuthReducer
}

export const Context = createContext();

const combinedReducers = (state = {}, action = {}) => Object.assign({}, ...Object.keys(reducers).map(k => ({[k]: reducers[k](state[k], action)})));

export default function Provider({children}){
    const [state, dispatch] = useReducer(logger(combinedReducers), combinedReducers({}));
    return (
        <Context.Provider value={[state, applyMiddleware(dispatch)]}>
            {children}
        </Context.Provider>
    )
}

export const  useStore = () => useContext(Context);