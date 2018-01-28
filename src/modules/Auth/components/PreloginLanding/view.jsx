import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
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
  }
});

const PreloginLanding = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.slider}>
      <Carousel>
        <div style={{ backgroundColor: 'yellow' }}>Page 1X</div>
        <div style={{ backgroundColor: 'blue' }}>Page 2</div>
        <div style={{ backgroundColor: 'green' }}>Page 3</div>
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

export default withStyles(styles)(PreloginLanding);
