import { all } from "redux-saga/effects";
import WelcomeSagas from '../sagas/WelcomeSagas';

export default function* rootSaga() {
	yield all([WelcomeSagas()])
}