import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCameraActive: false,
  currentGesture: null,
};

const gesturesSlice = createSlice({
  name: 'gestures',
  initialState,
  reducers: {
    activeCamera: (state, action) => {
      state.isCameraActive = true;
    },
    desactiveCamera: (state, action) => {
      state.isCameraActive = false;
    },
    setCurrentGesture: (state, action) => {
      state.currentGesture = action.payload.currentGesture;
    },
  },
});

export const { activeCamera, desactiveCamera, setCurrentGesture } = gesturesSlice.actions;

export default gesturesSlice.reducer;
