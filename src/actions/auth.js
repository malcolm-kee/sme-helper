import { AUTH_ACTION_TYPE } from '../constants';

// pure actions
export const attemptingLogin = () => ({
  type: AUTH_ACTION_TYPE.ATTEMPTING_LOGIN
});

export const loginSuccess = ({ email, displayName, photoURL }) => ({
  type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
  payload: { email, displayName, photoURL }
});

export const loginFailed = ({ error }) => ({
  type: AUTH_ACTION_TYPE.LOGIN_FAILED,
  payload: error.message
});

export const attemptingLogout = () => ({
  type: AUTH_ACTION_TYPE.ATTEMPTING_LOGOUT
});

export const logoutSuccess = () => ({
  type: AUTH_ACTION_TYPE.LOGOUT_SUCCESS
});

export const logoutFailed = ({ error }) => ({
  type: AUTH_ACTION_TYPE.LOGOUT_FAILED,
  payload: error.message
});
