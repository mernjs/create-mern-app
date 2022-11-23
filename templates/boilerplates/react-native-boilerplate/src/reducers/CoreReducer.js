import { createSlice } from '@reduxjs/toolkit';

const CoreReducer = createSlice({
  name: 'CoreReducer',

  initialState: {
    loaders: {},
  },

  reducers: {
    loaderActivate: (state, action) => {
      let loaders = state.loaders || {};
      loaders = {
        ...loaders,
        [action.payload]: true,
      };
      state.loaders = loaders;
    },
    loaderDeactivate: (state, action) => {
      let loaders = state.loaders || {};
      loaders = {
        ...loaders,
        [action.payload]: false,
      };
      state.loaders = loaders;
    },
  },
});

export const CoreActions = CoreReducer.actions;

export default CoreReducer.reducer;
