import { useDispatch } from 'react-redux'
import { apiRequest, formSubmitStart, formSubmitSuccess, formSubmitError } from '../Utilities'
import { AuthActions } from '../reducers/AuthReducer'
import Router from 'next/router'

const useAuth = (data) => {

    const dispatch = useDispatch()
    
    const login = async (payload) => {
        try {
            formSubmitStart('login')
            const response = await apiRequest({
                method: 'POST',
                url: `auth/login`,
                data: payload
            })
            dispatch(AuthActions.setAuth(response.data.data))
            formSubmitSuccess('login', response.data.message)
            Router.push('/dashboard')
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
            dispatch(AuthActions.setAuth(response.data.data))
            formSubmitSuccess('signup', response.data.message)
            Router.push('/dashboard')
        } catch (error) {
            formSubmitError('signup', error)
        }
    }

    const logout = () => {
        Router.push('/login')
        dispatch(AuthActions.logout())
    }

    const setAuth = (payload) => {
        dispatch(AuthActions.setAuth(payload))
    }

    return {
        login,
        signup,
        logout,
        setAuth
    }
};

export default useAuth;
