import React, { useReducer } from 'react';
import { apiRequest, formSubmitStart, formSubmitSuccess, formSubmitError, forwardTo } from 'Utilities'
import { useStore } from "Store"

const useAuth = (data) => {

    const [state, dispatch] = useStore();
    
    const login = async (payload) => {
        try {
            formSubmitStart('login')
            const response = await apiRequest({
                method: 'POST',
                url: `auth/login`,
                data: payload
            })
            dispatch({type: 'AUTH/SET', payload: response.data.data})
            formSubmitSuccess('login', response.data.message)
            forwardTo('/dashboard')
        } catch (error) {
            formSubmitError('login', error)
        }
    }

    const signup = async (payload) => {
        try {
            formSubmitStart('signup')
            const response = await apiRequest({
                method: 'POST',
                url: `auth/signup`,
                data: payload
            })
            formSubmitSuccess('signup', response.data.message)
            forwardTo('/login')
        } catch (error) {
            formSubmitError('signup', error)
        }
    }

    const logout = () => {
        dispatch({type: 'AUTH/LOGOUT'})
    }

    return {
        login,
        signup,
        logout
    }
};

export default useAuth;
