import { takeLatest, put, all } from "redux-saga/effects";

export function* test({payload}) {
    try{
        yield put({ type : "TEST/ACTION/SUCCESS", payload : payload })
    }catch(error){
        console.log('error', error.message)
    }
}

export default function* WelcomeSagas() {
    yield all([
        takeLatest("TEST/ACTION/REQUEST", test),
    ])
}