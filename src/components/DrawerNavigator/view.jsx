import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import Header from '../Header';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  content: {
    flex: 1,
    overflowY: 'scroll'
  }
};

const DrawerNavigator = ({
  navTitle,
  children,
  open,
  openDrawer,
  closeDrawer,
  classes
}) => (
  <div className={classes.root}>
    <Header title={navTitle} onButtonClick={openDrawer} />
    <div className={classes.content}>{children}</div>
    <Drawer anchor="left" open={open} onClose={closeDrawer}>
      <div>
        <List>
          <ListItem button>
            <ListItemText primary="Somewhere" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Somewhere else" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  </div>
);

DrawerNavigator.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.any.isRequired,
    content: PropTypes.any.isRequired
  }).isRequired,
  navTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

DrawerNavigator.defaultProps = {
  navTitle: ''
};

export default withStyles(styles)(DrawerNavigator);
