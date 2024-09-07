// canvasSlice.js
import { createSlice } from '@reduxjs/toolkit';

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    canvasRef: null,
    ctx: null,
  },
  reducers: {
    setCanvasRef(state, action) {
      state.canvasRef = action.payload;
      state.ctx = action.payload ? action.payload.getContext('2d') : null;
    },
  },
});

export const { setCanvasRef } = canvasSlice.actions;
export default canvasSlice.reducer;
