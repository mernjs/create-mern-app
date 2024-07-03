import { createSlice } from '@reduxjs/toolkit';
import { encrypt } from 'Utilities';

const AuthReducer = createSlice({
	name: 'AuthReducer',

	initialState: {
		user: null,
	},

	reducers: {
		setAuth: (state, action) => {
			const userEncrypted = encrypt(action.payload)
			state.user = userEncrypted;
		},
		logout: (state, action) => {
			state.user = null;
		},
	},
});

export const AuthActions = AuthReducer.actions;

export default AuthReducer.reducer;
