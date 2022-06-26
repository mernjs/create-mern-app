let user = JSON.parse(localStorage.getItem('user'))

let initialState = {
     user: null
}

if(user) initialState.user = user

export default (state = initialState, action) => {
    
    switch(action.type){
        case 'AUTH/SET':
            localStorage.setItem('user', JSON.stringify(action.payload))
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