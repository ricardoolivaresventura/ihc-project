import { combineReducers } from '@reduxjs/toolkit';
import generalSnackbarSlice from './reducers/generalSnackbar';
import gesturesSlice from './reducers/gestures';
import voiceCommandsSlice from './reducers/voiceCommands';

const rootReducer = combineReducers({
  generalSnackbar: generalSnackbarSlice,
  gestures: gesturesSlice,
  voiceCommands: voiceCommandsSlice,
});

export default rootReducer;
