import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { WelcomeReducer } from '../reducers/WelcomeReducer';
import { WelcomeStates } from '../types/WelcomeTypes';

 export interface IAppState {
	form : any,
	welcome: WelcomeStates
 }
 
 const rootReducer = combineReducers<IAppState>({
	form : formReducer,
    welcome: WelcomeReducer
 });


export default rootReducer;