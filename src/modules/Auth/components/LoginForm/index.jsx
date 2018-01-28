import React from 'react';

import LoginForm from './view';

class LoginFormContainer extends React.Component {
  state = {
    loginEmail: '',
    loginPassword: '',
    showPassword: false
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
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
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        togglePassword={this.togglePassword}
        handleMouseDownPassword={this.handleMouseDownPassword}
        {...this.state}
      />
    );
  }
}

export default LoginFormContainer;
