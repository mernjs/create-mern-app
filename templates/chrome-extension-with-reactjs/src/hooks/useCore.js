import { useDispatch } from 'react-redux'
import { CoreActions } from '../reducers/CoreReducer'

const useCore = (data) => {
    const dispatch = useDispatch()

    const switchTheme = async (payload) => {
        dispatch(CoreActions.switchTheme(payload))
    }

    return {
        switchTheme
    }
};

export default useCore;
