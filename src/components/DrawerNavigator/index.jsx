import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signOut } from '../../services/firebase';
import { selectUser } from '../../reducers';
import DrawerNavigatorView from './view';

class DrawerNavigatorContainer extends React.Component {
  static propTypes = {
    navTitle: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      photo: PropTypes.string
    })
  };

  static defaultProps = {
    navTitle: ''
  };

  state = {
    drawerOpen: false,
    userMenuOpen: false
  };

  handleOpenDrawer = () => {
    this.setState({ drawerOpen: true });
  };

  handleCloseDrawer = () => {
    this.setState({ drawerOpen: false });
  };

  handleGoSearch = ev => {
    ev.preventDefault();
    this.props.history.push('/search');
  };

  handleToggleUserMenu = ev => {
    ev.stopPropagation();
    this.setState(prevState => ({
      userMenuOpen: !prevState.userMenuOpen
    }));
  };

  handleSignOutClick = () => {
    signOut();
  };

  render() {
    return (
      <DrawerNavigatorView
        open={this.state.drawerOpen}
        userMenuOpen={this.state.userMenuOpen}
        openDrawer={this.handleOpenDrawer}
        closeDrawer={this.handleCloseDrawer}
        toggleUserMenu={this.handleToggleUserMenu}
        onSignOutClick={this.handleSignOutClick}
        goSearch={this.handleGoSearch}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

export const DrawerNavigator = withRouter(
  connect(mapStateToProps)(DrawerNavigatorContainer)
);
