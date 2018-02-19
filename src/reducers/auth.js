import { AUTH_STATE, AUTH_ACTION_TYPE } from '../constants';

const DEFAULT_STATE = {
  status: AUTH_STATE.ANONYMOUS,
  userName: '',
  userEmail: null,
  userPhoto: null,
  errorMsg: ''
};

export const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.ATTEMPTING_LOGIN:
    case AUTH_ACTION_TYPE.ATTEMPTING_LOGOUT:
      return {
        ...state,
        status: AUTH_STATE.AWAITING_AUTH_RESPONSE,
        errorMsg: ''
      };

    case AUTH_ACTION_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        status: AUTH_STATE.LOGGED_IN,
        userName: action.payload.displayName,
        userEmail: action.payload.email,
        userPhoto: action.payload.photoURL
      };

    case AUTH_ACTION_TYPE.LOGIN_FAILED:
      return {
        ...state,
        status: AUTH_STATE.ANONYMOUS,
        errorMsg: action.payload
      };

    case AUTH_ACTION_TYPE.LOGOUT_SUCCESS:
      return {
        ...state,
        status: AUTH_STATE.ANONYMOUS,
        userName: '',
        userEmail: null,
        userPhoto: null
      };

    case AUTH_ACTION_TYPE.LOGOUT_FAILED:
      return {
        ...state,
        status: AUTH_STATE.LOGGED_IN,
        errorMsg: action.payload
      };

    default:
      return state;
  }
};

export const selectUserData = authState => ({
  name: authState.userName,
  email: authState.userEmail,
  photo: authState.userPhoto
});
