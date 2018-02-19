import React from 'react';

import { signInGoogle, signOut } from '../../../../services/firebase';
import PreloginLanding from './view';

class PreloginLandingContainer extends React.Component {
  state = {
    pageLoaded: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ pageLoaded: true });
    }, 500);
  }

  handleSignInClick = () => {
    signInGoogle();
  };

  handleSignOutClick = () => {
    signOut();
  };

  render() {
    return (
      <PreloginLanding
        pageLoaded={this.state.pageLoaded}
        onSignInClick={this.handleSignInClick}
        onSignOutClick={this.handleSignOutClick}
      />
    );
  }
}

export default PreloginLandingContainer;
