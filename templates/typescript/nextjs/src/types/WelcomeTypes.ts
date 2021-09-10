export enum WelcomeTypes {
    SET_USER_REQUEST = 'WELCOME/USER/SET',
    RESET_USER_REQUEST = 'WELCOME/USER/RESET',

    SET_USER_SUCCESS = 'WELCOME/USER/SET/SUCCESS',
    RESET_USER_SUCCESS = 'WELCOME/USER/RESET/SUCCESS',
}

export interface User {
    id?: number;
    name?: string;
}

export interface WelcomeStates {
    user: User;
    loading: boolean;
}

export interface SetUserAction {
    type: typeof WelcomeTypes.SET_USER_REQUEST;
    payload: User;
}

export interface ResetUserAction {
    type: typeof WelcomeTypes.RESET_USER_REQUEST;
    payload: User;
}

export interface SetUserActionSuccess {
    type: typeof WelcomeTypes.SET_USER_SUCCESS;
    payload: User;
}

export interface ResetUserActionSuccess {
    type: typeof WelcomeTypes.RESET_USER_SUCCESS;
    payload: User;
}
  
export type WelcomeActions = SetUserAction | ResetUserAction | ResetUserActionSuccess | SetUserActionSuccess;