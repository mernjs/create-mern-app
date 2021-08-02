import router from '../../core/router'

export const ADD_USERS_SUCCESS = (state, payload) => {
    state.add_user = payload;
}

export const FETCH_USERS_REQUEST = (state) => {
    state.isLoading = true;
}

export const FETCH_USERS_SUCCESS = (state, payload) => {
    state.users = payload;
    state.isLoading = false;
}

export const DETAILS_USER_SUCCESS = (state, payload) => {
    state.user_details = payload;
}

export const UPDATE_USER_SUCCESS = (state, payload) => {
    state.update_user = payload;
}

export const DELETE_USER_SUCCESS = (state, payload) => {
    state.delete_user = payload;
}

export const LOGOUT = (state) => {
    console.log('LOGOUT');
    localStorage.removeItem('user');
    state.auth = [];
    state.isAuthentication = false
    router.push('/');
}