let initialState = {
    loaders: {},
    is_dark_theme: false,
}

export default (state = initialState, action) => {
    
    switch(action.type){
        case 'CORE/LOADER/ACTIVATE':
            let activate_loaders = state.loaders || {}
            activate_loaders = {
                ...activate_loaders,
                [action.payload]: true
            };
            return {
                ...state,
                loaders: activate_loaders
            }

        case 'CORE/LOADER/DEACTIVATE':
            let deactivate_loaders = state.loaders || {}
            deactivate_loaders = {
                ...deactivate_loaders,
                [action.payload]: false
            };
            return {
                ...state,
                loaders: deactivate_loaders
            }

        case 'CORE/THEME/SWITCH':
            let toggle = !state.is_dark_theme
            return {
                ...state,
                is_dark_theme: toggle
            }

        default:
            return state;
    }
}