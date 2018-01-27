import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Button, Grid, Icon, IconButton, Select } from 'material-ui';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  button: {
    marginTop: theme.spacing.unit
  },
  textField: {
    marginBottom: theme.spacing.unit
  }
});

const RegisterForm = ({
  classes,
  handleMouseDownPassword,
  onInputChange,
  onSubmit,
  registerBusinessName,
  registerCountry,
  registerEmail,
  registerFirstName,
  registerLastName,
  registerPassword,
  showPassword,
  togglePassword
}) => (
  <div className={classes.root}>
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={10}>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth>
            <InputLabel htmlFor="registerFirstName">First Name</InputLabel>
            <Input
              name="registerFirstName"
              id="registerFirstName"
              className={classes.textField}
              value={registerFirstName}
              onChange={onInputChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="registerLastName">Last Name</InputLabel>
            <Input
              name="registerLastName"
              id="registerLastName"
              className={classes.textField}
              value={registerLastName}
              onChange={onInputChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="registerCountry">Country</InputLabel>
            <Select
              native
              name="registerCountry"
              id="registerCountry"
              className={classes.textField}
              value={registerCountry}
              onChange={onInputChange}
              fullWidth
            >
              <option value="Malaysia">Malaysia</option>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="registerBusinessName">Business Name</InputLabel>
            <Input
              name="registerBusinessName"
              id="registerBusinessName"
              className={classes.textField}
              value={registerBusinessName}
              onChange={onInputChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="registerEmail">Email</InputLabel>
            <Input
              name="registerEmail"
              id="registerEmail"
              className={classes.textField}
              value={registerEmail}
              onChange={onInputChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="registerPassword">Password</InputLabel>
            <Input
              name="registerPassword"
              id="registerPassword"
              type={showPassword ? 'text' : 'password'}
              className={classes.textField}
              value={registerPassword}
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
            Sign Up
          </Button>
        </form>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(RegisterForm);
