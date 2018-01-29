import React from 'react';
import PropTypes from 'prop-types';

import DrawerNavigator from './view';

class DrawerNavigatorContainer extends React.Component {
  static propTypes = {
    navTitle: PropTypes.string
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

  render() {
    return (
      <DrawerNavigator
        open={this.state.drawerOpen}
        openDrawer={this.handleOpenDrawer}
        closeDrawer={this.handleCloseDrawer}
        {...this.props}
      />
    );
  }
}

export default DrawerNavigatorContainer;
