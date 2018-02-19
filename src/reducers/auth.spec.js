import 'jest';
import deepFreeze from 'deep-freeze';

import { AUTH_STATE } from '../constants';

import { authReducer } from './auth';
import { attemptingLogin, attemptingLogout, loginSuccess } from '../actions/auth';

describe('authReducer', () => {
  test('reduce state to awaiting login when attemptingLogin action', () => {
    const oriState = {
      status: AUTH_STATE.ANONYMOUS,
      userEmail: '',
      errorMsg: ''
    };

    const finalState = {
      status: AUTH_STATE.AWAITING_AUTH_RESPONSE,
      userEmail: '',
      errorMsg: ''
    };

    deepFreeze(oriState);

    expect(authReducer(oriState, attemptingLogin())).toEqual(finalState);
  });

  test('reduce state to awaiting response when attemptingLogout action', () => {
    const userEmail = 'malcolmkee@test.com';
    const errorMsg = '';

    const oriState = {
      status: AUTH_STATE.LOGGED_IN,
      userEmail,
      errorMsg
    };

    const finalState = {
      status: AUTH_STATE.AWAITING_AUTH_RESPONSE,
      userEmail,
      errorMsg
    };

    deepFreeze(oriState);

    expect(authReducer(oriState, attemptingLogout())).toEqual(finalState);
  });

  test('loginSuccess -> userEmail, userPhoto, and userName set', () => {
    const user = {
      displayName: 'Malcolm Kee',
      email: 'malcolm@test.com',
      photoURL: 'http://dummy.photo.com'
    };

    const oriState = {
      status: AUTH_STATE.ANONYMOUS,
      userName: '',
      userEmail: null,
      userPhoto: null
    };

    const finalState = {
      status: AUTH_STATE.LOGGED_IN,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL
    };

    const loginSuccessAction = loginSuccess(user);

    deepFreeze(oriState);

    expect(authReducer(oriState, loginSuccessAction)).toEqual(finalState);
  });
});
