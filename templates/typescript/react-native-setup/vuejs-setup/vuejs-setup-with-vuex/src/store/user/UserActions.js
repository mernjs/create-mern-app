import * as Helpers from '../../helpers/helpers'

export const addUser = ({ commit }) => {
    Helpers.ajaxRequest({method: 'get', endPoint: 'comments'})
    .then(response => {
        commit('ADD_USERS_SUCCESS', response.data);
    }).catch(error => {
        console.error(error)
    });
}

export const fetchUsers = ({ commit }) => {
    commit('FETCH_USERS_REQUEST');
    Helpers.ajaxRequest({method: 'get', endPoint: 'users'})
    .then(response => {
        commit('FETCH_USERS_SUCCESS', response.data);
    }).catch(error => {
        console.error(error)
    });
}

export const detailsUser = ({ commit }, data={}) => {
    Helpers.ajaxRequest({method: 'get', endPoint: `users/${data.id}`})
    .then(response => {
        commit('DETAILS_USER_SUCCESS', response.data);
        localStorage.setItem('user', JSON.stringify(response.data))
    }).catch(error => {
        console.error(error)
    });
}

export const updateUser = ({ commit }, data={}) => {
    Helpers.ajaxRequest({method: 'get', endPoint: `users/${data.id}`})
    .then(response => {
        commit('UPDATE_USER_SUCCESS', response.data);
    }).catch(error => {
        console.error(error)
    });
}

export const deleteUser = ({ commit }, data={}) => {
    Helpers.ajaxRequest({method: 'get', endPoint: `users/${data.id}`})
    .then(response => {
        commit('DELETE_USER_SUCCESS', response.data);
    }).catch(error => {
        console.error(error)
    });
}

export const logout = ({ commit }) => {
    commit('LOGOUT');
}