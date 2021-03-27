import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import WelcomeReducer from 'src/reducers/WelcomeReducer';

const rootReducer = combineReducers({
	form : formReducer,
	welcome : WelcomeReducer
});

export default rootReducer;