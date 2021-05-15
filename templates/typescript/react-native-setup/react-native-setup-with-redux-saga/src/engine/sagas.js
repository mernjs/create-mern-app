import { all } from "redux-saga/effects";

import WelcomeSagas from 'src/sagas/WelcomeSagas';

export default function* rootSaga() {
	yield all([WelcomeSagas()])
}