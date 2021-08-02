let initialState = { }

export default function WelcomeReducer(state = initialState, action) {
    switch (action.type) {

        case 'TEST/ACTION/SUCCESS' :
            return {
                ...state,
                ...action.payload,
            } 

        default:
            return state
    }
}