import { combineReducers } from '@reduxjs/toolkit';
import generalSnackbarSlice from './reducers/generalSnackbar';
import gesturesSlice from './reducers/gestures';

const rootReducer = combineReducers({
  generalSnackbar: generalSnackbarSlice,
  gestures: gesturesSlice,
});

export default rootReducer;
