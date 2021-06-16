export enum WelcomeTypes {
    SET_USER = 'WELCOME/USER/SET',
    RESET_USER = 'WELCOME/USER/RESET',
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
    type: WelcomeTypes.SET_USER;
    payload: User;
}

export interface ResetUserAction {
    type: WelcomeTypes.RESET_USER;
    payload: User;
}
  
export type WelcomeActions = SetUserAction | ResetUserAction;