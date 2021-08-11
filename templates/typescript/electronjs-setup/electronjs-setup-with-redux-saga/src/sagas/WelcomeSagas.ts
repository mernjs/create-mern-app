import { takeLatest, put, all } from "redux-saga/effects";
import { WelcomeTypes, SetUserAction, ResetUserAction } from '../types/WelcomeTypes';

export function* setUser(data: SetUserAction) {
    try{
        yield put({type: WelcomeTypes.SET_USER_SUCCESS, payload: data.payload})
    }catch(error){
        console.log('error', error.message)
    }
}

export function* resetUser(data: ResetUserAction) {
    try{
        yield put({type: WelcomeTypes.RESET_USER_SUCCESS, payload: data.payload})
    }catch(error){
        console.log('error', error.message)
    }
}

export default function* WelcomeSagas() {
    yield all([
        takeLatest(WelcomeTypes.SET_USER_REQUEST, setUser),
        takeLatest(WelcomeTypes.RESET_USER_REQUEST, resetUser),
    ])
}