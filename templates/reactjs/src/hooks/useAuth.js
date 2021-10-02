import { useDispatch } from 'react-redux'
import { apiRequest, formSubmitStart, formSubmitSuccess, formSubmitError, forwardTo} from 'Utilities'
import { AuthActions } from 'reducers/AuthReducer'

const useAuth = (data) => {

    const dispatch = useDispatch()
    
    const login = async (payload) => {
        try {
            formSubmitStart('login')
            const response = await apiRequest({
                method: 'POST',
                url: `user/login`,
                data: payload
            })
            console.log('response', response)
            let data = response.data.data
            dispatch(AuthActions.setAuth(data))
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
                url: `user/signup`,
                data: payload
            })
            formSubmitSuccess('signup', response.data.message)
            forwardTo('/login')
        } catch (error) {
            formSubmitError('signup', error)
        }
    }

    const logout = () => {
        dispatch(AuthActions.logout())
    }


    return {
        login,
        signup,
        logout
    }
};

export default useAuth;
