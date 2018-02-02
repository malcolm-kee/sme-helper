import 'jest';
import deepFreeze from 'deep-freeze';

import { AUTH_STATE } from '../constants';

import authReducer from './auth';
import { attemptingLogin, attemptingLogout } from '../actions/auth';

describe('authReducer', () => {
  it('reduce state to awaiting login when attemptingLogin action', () => {
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

  it('reduce state to awaiting response when attemptingLogout action', () => {
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
});
