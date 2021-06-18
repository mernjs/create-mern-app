import { WelcomeTypes, WelcomeActions, WelcomeStates } from '../types/WelcomeTypes';

const InitialState: WelcomeStates = {
    user: {},
	loading: false
}

export const WelcomeReducer = (state: WelcomeStates = InitialState, action: WelcomeActions): WelcomeStates => {
    switch (action.type) {
      	case WelcomeTypes.SET_USER_SUCCESS: {
			return {
          		...state,
          		user: action.payload
        	}
      	}

		case WelcomeTypes.RESET_USER_SUCCESS: {
			return {
          		...state,
          		user: {}
        	}
      	}

      	default:
        	return state;
    }
}