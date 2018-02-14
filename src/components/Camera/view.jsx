import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog from 'material-ui/Dialog';
import Toolbar from 'material-ui/Toolbar';

const decorate = withStyles(theme => {
  const camera = {
    maxWidth: '100vw'
  };

  const cameraContainer = {
    padding: 0,
    display: 'relative'
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

  const closeButton = {
    position: 'absolute',
    color: theme.palette.grey['100'],
    top: 0,
    right: 0
  };

  const captureButton = {
    height: 'auto',
    width: 'auto'
  };

  const actionIcon = {
    fontSize: theme.typography.display2.fontSize,
    fontWeight: theme.typography.fontWeightMedium
  };

  const captureIcon = {
    fontSize: theme.typography.display4.fontSize,
    fontWeight: theme.typography.fontWeightMedium
  };

  const btnGroup = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between'
  };

  return {
    camera,
    cameraContainer,
    button,
    title,
    closeButton,
    actionIcon,
    btnGroup,
    captureButton,
    captureIcon
  };
});

export const CameraView = decorate(
  ({
    open,
    setVideoRef,
    startCamera,
    capturePhoto,
    stopCamera,
    toggleCamera,
    onVideoLoadedMetada,
    enableToggleCamera,
    classes
  }) => (
    <Dialog open={open} fullScreen>
      <div className={classes.cameraContainer}>
        <video
          ref={video => setVideoRef(video)}
          onLoadedMetadata={onVideoLoadedMetada}
          className={classes.camera}
        />
        <IconButton onClick={stopCamera} className={classes.closeButton}>
          <Icon className={classes.actionIcon}>close</Icon>
        </IconButton>
        <Toolbar className={classes.btnGroup}>
          <div />
          <IconButton
            color="primary"
            onClick={capturePhoto}
            className={classes.captureButton}
          >
            <Icon className={classes.captureIcon}>panorama_fish_eye</Icon>
          </IconButton>
          {enableToggleCamera ? (
            <IconButton color="primary" onClick={toggleCamera} className={classes.button}>
              <Icon className={classes.actionIcon}>camera_rear</Icon>
            </IconButton>
          ) : (
            <div />
          )}
        </Toolbar>
      </div>
    </Dialog>
  )
);
