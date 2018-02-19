import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginSuccess, logoutSuccess } from '../actions/auth';
import { subscribeToAuthChange } from '../services/firebase';

class AuthListenerContainer extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.unsubscribe = subscribeToAuthChange(this.onAuthChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onAuthChange = user => {
    const { onLogin, onLogout } = this.props;
    if (user) {
      onLogin(user);
    } else {
      onLogout();
    }
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin(user) {
    dispatch(loginSuccess(user));
  },
  onLogout() {
    logoutSuccess();
  }
});

export const AuthListener = connect(null, mapDispatchToProps)(AuthListenerContainer);
