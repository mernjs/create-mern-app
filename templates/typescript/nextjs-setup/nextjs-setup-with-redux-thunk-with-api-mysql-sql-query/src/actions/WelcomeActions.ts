import { Dispatch } from 'redux';
import { WelcomeTypes, SetUserAction, ResetUserAction, User } from '../types/WelcomeTypes';

export const setUser = (data: User) => {
    return async (dispatch: Dispatch<SetUserAction>) => {
        dispatch({type: WelcomeTypes.SET_USER, payload: data})
    }
}

export const resetUser = (data: User) => {
    return async (dispatch: Dispatch<ResetUserAction>) => {
        dispatch({type: WelcomeTypes.RESET_USER, payload: data})
    }
}