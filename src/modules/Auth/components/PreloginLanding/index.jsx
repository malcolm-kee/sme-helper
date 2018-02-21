import React from 'react';
import { connect } from 'react-redux';

import { signInGoogle, signOut } from '../../../../services/firebase';
import { AUTH_STATE } from '../../../../constants';
import PreloginLanding from './view';

class PreloginLandingContainer extends React.Component {
  state = {
    pageLoaded: false
  };

  handleSignInClick = () => {
    signInGoogle();
  };

  handleSignOutClick = () => {
    signOut();
  };

  componentDidMount() {
    if (this.props.authStatus === AUTH_STATE.LOGGED_IN) {
      this.props.history.push('overview');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authStatus === AUTH_STATE.LOGGED_IN) {
      this.props.history.push('overview');
    }
  }

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

const mapStateToProps = state => ({
  authStatus: state.auth.status
});

export default connect(mapStateToProps)(PreloginLandingContainer);
