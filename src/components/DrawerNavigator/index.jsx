import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import DrawerNavigatorView from './view';

class DrawerNavigatorContainer extends React.Component {
  static propTypes = {
    navTitle: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static defaultProps = {
    navTitle: ''
  };

  state = {
    drawerOpen: false
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

  render() {
    return (
      <DrawerNavigatorView
        open={this.state.drawerOpen}
        openDrawer={this.handleOpenDrawer}
        closeDrawer={this.handleCloseDrawer}
        goSearch={this.handleGoSearch}
        {...this.props}
      />
    );
  }
}

export const DrawerNavigator = withRouter(DrawerNavigatorContainer);
