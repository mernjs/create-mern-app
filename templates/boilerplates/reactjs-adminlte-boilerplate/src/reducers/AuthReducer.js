import { createSlice } from '@reduxjs/toolkit';

const AuthReducer = createSlice({
  name: 'AuthReducer',

  initialState: {
    user: { email: 'vvv', name: 'vv' },
    users: [],
  },

  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const AuthActions = AuthReducer.actions;

export default AuthReducer.reducer;
