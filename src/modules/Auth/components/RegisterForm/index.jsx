import React from 'react';

import RegisterForm from './view';

class RegisterFormContainer extends React.Component {
  state = {
    registerBusinessName: '',
    registerCountry: 'Malaysia',
    registerEmail: '',
    registerFirstName: '',
    registerLastName: '',
    registerPassword: ''
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
      <RegisterForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        togglePassword={this.togglePassword}
        handleMouseDownPassword={this.handleMouseDownPassword}
        {...this.state}
      />
    );
  }
}

export default RegisterFormContainer;
