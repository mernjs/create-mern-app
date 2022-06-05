import React, { useReducer } from 'react';
import { useStore } from "Store"

const useCore = (data) => {
    const [state, dispatch] = useStore();

    const switchTheme = async (payload) => {
        dispatch({type: 'CORE/THEME/SWITCH'})
    }

    return {
        switchTheme
    }
};

export default useCore;
