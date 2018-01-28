import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'material-ui';
import { withStyles, withTheme } from 'material-ui/styles';
import { Zoom } from 'material-ui/transitions';

import Carousel from '../../../../components/Carousel';

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

const PreloginLanding = ({ classes, theme, pageLoaded }) => (
  <div className={classes.root}>
    <div className={classes.slider}>
      <Carousel>
        <div className={classes.marketingContentCenter}>
          <h1>Welcome to</h1>
          <Zoom
            in={pageLoaded}
            enterDelay={theme.transitions.duration.enteringScreen}
            timeout={theme.transitions.duration.complex}
          >
            <h1 style={theme.typography.display3}>SME Helper</h1>
          </Zoom>
        </div>
        <div className={classes.marketingContentLeft}>
          <div>
            <Icon style={{ fontSize: theme.typography.display2.fontSize }}>event</Icon>
          </div>
          <h1>Remember your booking</h1>
        </div>
        <div className={classes.marketingContentRight}>
          <div>
            <Icon style={{ fontSize: theme.typography.display2.fontSize }}>print</Icon>
          </div>
          <h1>Generate the invoice</h1>
        </div>
        <div className={classes.marketingContentLeft}>
          <div>
            <Icon style={{ fontSize: theme.typography.display2.fontSize }}>
              announcement
            </Icon>
          </div>
          <h1>Notify you of important stuffs</h1>
        </div>
        <div className={classes.marketingContentRight}>
          <div>
            <Icon style={{ fontSize: theme.typography.display2.fontSize }}>
              trending_up
            </Icon>
          </div>
          <h1>Timely and awesome analytics</h1>
        </div>
      </Carousel>
    </div>
    <div className={classes.actionPanel}>
      <Button raised fullWidth component={Link} to="/register" className={classes.button}>
        Sign Up
      </Button>
      <Button
        raised
        fullWidth
        component={Link}
        to="/login"
        color="primary"
        className={classes.button}
      >
        Login
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(withTheme()(PreloginLanding));
