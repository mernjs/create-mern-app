export function test(args){
    return dispatch => {
        dispatch({ type: 'TEST/ACTION/SUCCESS', payload: args })
    }
}