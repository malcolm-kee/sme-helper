import { combineReducers } from 'redux';

import { authReducer, selectUserData } from './auth';
import { noteReducer } from './note';

export const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer
});

/* Selector */
export const selectUser = state => selectUserData(state.auth);
