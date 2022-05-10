import { createSlice } from '@reduxjs/toolkit';

const AuthReducer = createSlice({
    name: 'AuthReducer',

    initialState: {
        user: null
    },
  
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = null
        }
    }
})

export const AuthActions = AuthReducer.actions

export default AuthReducer.reducer