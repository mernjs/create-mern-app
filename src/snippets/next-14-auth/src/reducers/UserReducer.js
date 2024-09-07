import { createSlice } from '@reduxjs/toolkit';
import { UserServices } from '@/services/UserServices';

const UserReducer = createSlice({
	name: 'UserReducer',

	initialState: {
		users: [],
	},

	reducers: {
		resetUsers: (state, action) => {
			state.users = [];
		},
	},

	extraReducers: (builder) => {
		builder
			.addMatcher(UserServices.endpoints.getUsers.matchPending, (state, action) => {
				console.log('pending', action);
			})
			.addMatcher(UserServices.endpoints.getUsers.matchFulfilled, (state, action) => {
				console.log('fulfilled', action);
				state.users = action.payload.data;
			})
			.addMatcher(UserServices.endpoints.getUsers.matchRejected, (state, action) => {
				console.log('rejected', action);
			});
	},

});

export const UserActions = UserReducer.actions;

export default UserReducer.reducer;
