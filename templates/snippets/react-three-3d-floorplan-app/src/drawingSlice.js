import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tool: 'Pencil',
  color: '#000000',
  history: [],
  redoStack: [],
};

const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
      state.redoStack = [];
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const lastState = state.history.pop();
        state.redoStack.push(lastState);
      }
    },
    redo: (state) => {
      if (state.redoStack.length > 0) {
        const nextState = state.redoStack.pop();
        state.history.push(nextState);
      }
    },
  },
});

export const { setTool, setColor, addToHistory, undo, redo } = drawingSlice.actions;

export default drawingSlice.reducer;
