import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AUTH_STATE } from '../../../../constants';
import { login } from '../../../../actions/auth';

import LoginForm from './view';

class LoginFormContainer extends React.Component {
  static propTypes = {
    authStatus: PropTypes.string.isRequired,
    authError: PropTypes.string.isRequired,
    dispatchLogin: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    loginEmail: '',
    loginPassword: '',
    showPassword: false
  };

  handleSubmit = event => {
    event.preventDefault();

    const { loginEmail: email, loginPassword: password } = this.state;
    const { history } = this.props;

    this.props.dispatchLogin({
      email,
      password,
      history
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  togglePassword = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { authError, authStatus } = this.props;
    const isLoading = authStatus === AUTH_STATE.AWAITING_AUTH_RESPONSE;

    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        togglePassword={this.togglePassword}
        handleMouseDownPassword={this.handleMouseDownPassword}
        isLoading={isLoading}
        authError={authError}
        {...this.state}
      />
    );
  }
}

const mapStateToProps = state => ({
  authStatus: state.auth.status,
  authError: state.auth.errorMsg
});

const mapDispatchToProps = dispatch => ({
  dispatchLogin({ email, password, history }) {
    dispatch(login({ email, password, history }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
