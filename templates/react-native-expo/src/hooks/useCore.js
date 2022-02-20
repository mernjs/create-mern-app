import { useDispatch } from 'react-redux'
import { CoreActions } from '../reducers/CoreReducer'
import { showToast } from '../Utilities'

const useCore = (data) => {
    const dispatch = useDispatch()

    const switchTheme = async (payload) => {
        dispatch(CoreActions.switchTheme(payload))
        showToast('Theme Switch Successfully!', 'success')
    }

    return {
        switchTheme
    }
};

export default useCore;
