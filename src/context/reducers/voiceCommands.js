import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMicroActive: false,
  currentVoiceCommand: null,
};

const voiceCommandsSlide = createSlice({
  name: 'voiceCommands',
  initialState,
  reducers: {
    activeMicrophono: (state, action) => {
      state.isMicroActive = true;
    },
    desactiveMicrophono: (state, action) => {
      state.isMicroActive = false;
    },
    setCurrentVoiceCommand: (state, action) => {
      state.currentVoiceCommand = action.payload.currentVoiceCommand;
    },
  },
});

export const { activeMicrophono, desactiveMicrophono, setCurrentVoiceCommand } =
  voiceCommandsSlide.actions;

export default voiceCommandsSlide.reducer;
