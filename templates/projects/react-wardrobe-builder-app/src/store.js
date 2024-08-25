import { configureStore } from '@reduxjs/toolkit';
import drawingReducer from './drawingSlice';

export const store = configureStore({
  reducer: {
    drawing: drawingReducer,
  },
});
