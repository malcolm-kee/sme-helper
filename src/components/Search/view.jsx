import React from 'react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';

const styles = themes => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: themes.zIndex.modal
  },
  content: {
    flex: 1,
    overflowY: 'scroll'
  }
});

const BackBtn = () => (
  <InputAdornment position="start">
    <IconButton>
      <Icon>arrow_back</Icon>
    </IconButton>
  </InputAdornment>
);

const SearchBtn = () => (
  <InputAdornment position="end">
    <IconButton>
      <Icon>search</Icon>
    </IconButton>
  </InputAdornment>
);

export const SearchView = withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static" color="default">
      <Toolbar>
        <Input
          fullWidth
          disableUnderline
          placeholder="Search"
          startAdornment={<BackBtn />}
          endAdornment={<SearchBtn />}
        />
      </Toolbar>
    </AppBar>
    Search goes here
  </div>
));
