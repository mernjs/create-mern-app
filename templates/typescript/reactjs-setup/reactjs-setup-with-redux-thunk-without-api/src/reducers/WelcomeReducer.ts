import { Reducer } from 'redux';
import { WelcomeTypes, WelcomeActions, WelcomeStates } from '../types/WelcomeTypes';

const InitialState: WelcomeStates = {
    user: {},
	loading: false
}

export const WelcomeReducer: Reducer<WelcomeStates, WelcomeActions> = (state = InitialState, action) => {
    switch (action.type) {
      	case WelcomeTypes.SET_USER: {
			return {
          		...state,
          		user: action.payload
        	}
      	}

		case WelcomeTypes.RESET_USER: {
			return {
          		...state,
          		user: {}
        	}
      	}

      	default:
        	return state;
    }
}