import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Button, Grid, Icon, IconButton } from 'material-ui';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3
  },
  button: {
    marginTop: theme.spacing.unit
  },
  textField: {
    marginBottom: theme.spacing.unit
  },
  hintText: {
    ...theme.typography.body1,
    textAlign: 'center'
  }
});

const LoginForm = ({
  classes,
  onSubmit,
  onInputChange,
  togglePassword,
  loginEmail,
  loginPassword,
  showPassword,
  handleMouseDownPassword
}) => (
  <div className={classes.root}>
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={10}>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth>
            <InputLabel htmlFor="loginEmail">Email</InputLabel>
            <Input
              name="loginEmail"
              id="loginEmail"
              className={classes.textField}
              value={loginEmail}
              onChange={onInputChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="loginPassword">Password</InputLabel>
            <Input
              name="loginPassword"
              id="loginPassword"
              type={showPassword ? 'text' : 'password'}
              className={classes.textField}
              value={loginPassword}
              onChange={onInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            raised
            fullWidth
            color="primary"
            className={classes.button}
            type="submit"
          >
            Login
          </Button>
          <div>
            <p className={classes.hintText}>
              Don't have an account? <Link to="/register">Register</Link> instead.
            </p>
          </div>
        </form>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(LoginForm);
