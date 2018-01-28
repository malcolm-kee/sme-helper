import { AUTH_ACTION_TYPE } from '../constants';
import { authApi } from '../api/auth';

// pure actions
export const attemptingLogin = () => ({
  type: AUTH_ACTION_TYPE.ATTEMPTING_LOGIN
});

export const loginSuccess = ({ email }) => ({
  type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
  payload: email
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

// thunk-actions
export const login = ({ email, password, history }) => dispatch => {
  dispatch(attemptingLogin());
  authApi({ email, password })
    .then(userEmail => {
      dispatch(loginSuccess({ email: userEmail }));
      history.push('/overview');
    })
    .catch(error => {
      dispatch(loginFailed({ error }));
    });
};
