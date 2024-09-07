import { configureStore } from '@reduxjs/toolkit';
import drawingReducer from '../features/drawing/drawingSlice';

export const store = configureStore({
  reducer: {
    drawing: drawingReducer,
  },
});
