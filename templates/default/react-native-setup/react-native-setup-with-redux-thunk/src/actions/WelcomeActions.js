export function test(data) {
    return dispatch => {
        dispatch({type: 'TEST/ACTION/SUCCESS', payload: data});
    };
}