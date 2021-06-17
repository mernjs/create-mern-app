import { User, SetUserAction, ResetUserAction, WelcomeTypes } from '../types/WelcomeTypes';

export function setUser(data: User): SetUserAction{
    return {type: WelcomeTypes.SET_USER_REQUEST, payload: data}
}

export function resetUser(data: User): ResetUserAction{
    return {type: WelcomeTypes.RESET_USER_REQUEST, payload: data}
}