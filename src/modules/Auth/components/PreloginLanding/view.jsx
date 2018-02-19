import React from 'react';
import Button from 'material-ui/Button';
import { withStyles, withTheme } from 'material-ui/styles';
import { Zoom } from 'material-ui/transitions';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  slider: {
    flex: 6,
    display: 'flex'
  },
  actionPanel: {
    flex: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit
  },
  marketingContentCenter: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.unit
  },
  marketingContentLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: theme.spacing.unit
  },
  marketingContentRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'right',
    padding: theme.spacing.unit
  }
});

const PreloginLanding = ({
  classes,
  theme,
  pageLoaded,
  onSignInClick,
  onSignOutClick
}) => (
  <div className={classes.root}>
    <div className={classes.slider}>
      <div className={classes.marketingContentCenter}>
        <h1>Welcome to</h1>
        <Zoom in={pageLoaded} timeout={theme.transitions.duration.complex}>
          <h1 style={theme.typography.display3}>SME Helper</h1>
        </Zoom>
      </div>
    </div>
    <div className={classes.actionPanel}>
      <Button
        onClick={onSignOutClick}
        variant="raised"
        fullWidth
        className={classes.button}
      >
        Sign Out
      </Button>
      <Button
        onClick={onSignInClick}
        variant="raised"
        fullWidth
        color="primary"
        className={classes.button}
      >
        Login
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(withTheme()(PreloginLanding));
