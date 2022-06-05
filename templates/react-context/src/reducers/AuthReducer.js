let initialState = {
     user: null
}

export default (state = initialState, action) => {
    
    switch(action.type){
        case 'AUTH/SET':
            return {
                ...state,
                user: action.payload
            }

        case 'AUTH/LOGOUT':
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}