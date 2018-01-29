import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Icon, IconButton, Toolbar, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  menuButton: {
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const Header = ({ classes, onButtonClick, title }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton className={classes.menuButton} onClick={onButtonClick}>
        <Icon>menu</Icon>
      </IconButton>
      <Typography type="title" color="inherit">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  onButtonClick: PropTypes.func,
  title: PropTypes.string
};

Header.defaultProps = {
  onButtonClick() {
    /* do nothing */
  },
  title: ''
};

export default withStyles(styles)(Header);
