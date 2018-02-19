import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Icon, IconButton, Toolbar, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  title: {
    flex: 1
  },
  menuButton: {
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  rightButton: {
    marginLeft: theme.spacing.unit,
    marginRight: -theme.spacing.unit
  }
});

const Header = ({ classes, onButtonClick, title, backButton, renderRightSection }) => {
  let rightSection;

  if (renderRightSection) {
    rightSection = <div className={classes.rightButton}>{renderRightSection()}</div>;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          onClick={onButtonClick}
          color="inherit"
        >
          <Icon>{backButton ? 'arrow_back' : 'menu'}</Icon>
        </IconButton>
        <Typography type="title" color="inherit" className={classes.title}>
          {title}
        </Typography>
        {rightSection}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onButtonClick: PropTypes.func,
  title: PropTypes.string,
  backButton: PropTypes.bool,
  rightButton: PropTypes.bool,
  rightButtonText: PropTypes.string,
  rightButtonIcon: PropTypes.string,
  onRightButtonClick: PropTypes.func
};

Header.defaultProps = {
  onButtonClick() {
    /* do nothing */
  },
  title: '',
  backButton: false,
  rightButton: false,
  rightButtonIcon: '',
  onRightButtonClick() {
    /* do nothing */
  }
};

export default withStyles(styles)(Header);
