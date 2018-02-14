import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';

import './style.css';

// import { constants } from './constants';
// const { SUPPORTS_MEDIA_DEVICES } = constants;

import { Camera } from '../../../../components/Camera';

const decorate = withStyles(theme => {
  const root = {
    display: 'flex',
    flexFlow: 'column',
    height: '100%'
  };

  const content = {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  };

  const camera = {
    maxWidth: '100vw'
  };

  const cameraContainer = {
    padding: 0
  };

  const button = {
    margin: theme.spacing.unit
  };

  const title = {
    fontSize: theme.typography.title.fontSize,
    borderBottom: `1px solid ${theme.palette.grey['300']}`,
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  };

  const btmToolbar = {
    padding: 0,
    justifyContent: 'space-between'
  };

  return { camera, cameraContainer, content, root, button, title, btmToolbar };
});

export const EditorView = decorate(
  ({
    menuAnchor,
    cameraShown,
    hasCapture,
    openMenu,
    closeMenu,
    setCapturedRef,
    openCamera,
    removePhoto,
    onPhotoCaptured,
    onCameraClosed,
    classes
  }) => (
    <div className={`Note--Editor ${classes.root}`}>
      <div className={`title ${classes.title}`} contentEditable />
      <div className={`content ${classes.content}`} contentEditable />
      <img alt="captured" src="" ref={capture => setCapturedRef(capture)} />
      <AppBar position="static" color="default">
        <Toolbar className={classes.btmToolbar}>
          <IconButton color="primary" onClick={openMenu} className={classes.button}>
            <Icon>add_box</Icon>
          </IconButton>
          <Menu
            open={Boolean(menuAnchor)}
            anchorEl={menuAnchor}
            onClose={closeMenu}
            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MenuItem onClick={openCamera}>
              <ListItemIcon color="primary" className={classes.button}>
                <Icon>add_a_photo</Icon>
              </ListItemIcon>
              <ListItemText primary="Take Photo" />
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <ListItemIcon color="primary" className={classes.button}>
                <Icon>photo</Icon>
              </ListItemIcon>
              <ListItemText primary="Choose image" />
            </MenuItem>
          </Menu>
          {hasCapture ? (
            <IconButton color="primary" onClick={removePhoto} className={classes.button}>
              <Icon>delete</Icon>
            </IconButton>
          ) : null}
          <IconButton color="primary" className={classes.button}>
            <Icon>save</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Camera
        open={cameraShown}
        onPhotoCaptured={onPhotoCaptured}
        onCameraClose={onCameraClosed}
      />
    </div>
  )
);
