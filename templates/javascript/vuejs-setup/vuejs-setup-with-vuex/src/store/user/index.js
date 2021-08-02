import * as UserActions from './UserActions'
import * as UserGetters from './UserGetters'
import * as UserMutations from './UserMutations'

const initialState = {
	auth: [],
	users: [],
	isLoading: false
}

export default {
	namespaced: true,
	state: initialState,
	actions: UserActions,
	getters: UserGetters,
	mutations: UserMutations
}