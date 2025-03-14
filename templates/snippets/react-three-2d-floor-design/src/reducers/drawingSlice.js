import { createSlice } from '@reduxjs/toolkit';

const drawingSlice = createSlice({
  name: 'drawing',
  initialState: {
    tool: 'brush',
    color: 'black',
    history: [],
    currentState: null,
  },
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
      state.currentState = action.payload;
    },
    undo: (state) => {
      if (state.history.length > 0) {
        state.history.pop();
        state.currentState = state.history[state.history.length - 1] || null;
      }
    },
    redo: (state) => {
      // Implement redo functionality if needed
    },
  },
});

export const { setTool, setColor, addToHistory, undo, redo } = drawingSlice.actions;

export default drawingSlice.reducer;
