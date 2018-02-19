import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';

import Header from '../Header';

const decorate = withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  content: {
    flex: 1,
    overflowY: 'scroll'
  },
  headerRight: {
    display: 'flex'
  },
  headerRightAction: {
    marginLeft: theme.spacing.unit
  }
}));

const DrawerNavigator = ({
  navTitle,
  children,
  open,
  userMenuOpen,
  openDrawer,
  closeDrawer,
  toggleUserMenu,
  onSignOutClick,
  goSearch,
  classes,
  user
}) => (
  <div className={classes.root}>
    <Header
      title={navTitle}
      onButtonClick={openDrawer}
      renderRightSection={() => (
        <div className={classes.headerRight}>
          <IconButton
            className={classes.headerRightAction}
            onClick={goSearch}
            color="inherit"
          >
            <Icon>search</Icon>
          </IconButton>
          <Avatar
            onClick={toggleUserMenu}
            alt={user.name}
            src={user.photo}
            className={classes.headerRightAction}
          />
        </div>
      )}
    />
    <Collapse in={userMenuOpen}>
      <List disablePadding>
        <ListItem onClick={onSignOutClick} button divider>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Collapse>
    <div className={classes.content}>{children}</div>
    <Drawer anchor="left" open={open} onClose={closeDrawer}>
      <div>
        <List>
          <ListItem button component={Link} to="/overview">
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem button component={Link} to="/note">
            <ListItemText primary="Note" />
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
  userMenuOpen: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string
  })
};

DrawerNavigator.defaultProps = {
  navTitle: ''
};

export default decorate(DrawerNavigator);
