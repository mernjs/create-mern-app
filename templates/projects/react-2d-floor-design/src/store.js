import { configureStore } from '@reduxjs/toolkit';
import drawingReducer from './reducers/drawingSlice';
import canvasReducer from './reducers/canvasSlice';

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    drawing: drawingReducer,
  },
});
