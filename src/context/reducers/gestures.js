import { createSlice } from '@reduxjs/toolkit';
import { PRIORITIES } from '../../utils/constants';

const initialState = {
  isCameraActive: false,
  currentGesture: null,
  defaultPriority: PRIORITIES[0].value,
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
    setDefaultPriority: (state, action) => {
      state.defaultPriority = action.payload.defaultPriority;
    },
  },
});

export const { activeCamera, desactiveCamera, setCurrentGesture, setDefaultPriority } =
  gesturesSlice.actions;

export default gesturesSlice.reducer;
