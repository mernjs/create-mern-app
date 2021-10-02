import { useDispatch } from 'react-redux'
import { CoreActions } from 'app/reducers/CoreReducer'
import { showToast } from 'app/Utilities'

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
