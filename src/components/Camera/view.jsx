import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';

const decorate = withStyles(theme => {
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

  return { camera, cameraContainer, button, title };
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
      <DialogContent className={classes.cameraContainer}>
        <video
          ref={video => setVideoRef(video)}
          onLoadedMetadata={onVideoLoadedMetada}
          className={classes.camera}
        />
      </DialogContent>
      <DialogActions>
        <IconButton color="primary" onClick={capturePhoto} className={classes.button}>
          <Icon>lens</Icon>
        </IconButton>
        {enableToggleCamera ? (
          <IconButton color="primary" onClick={toggleCamera} className={classes.button}>
            <Icon>camera_rear</Icon>
          </IconButton>
        ) : null}
        <IconButton color="primary" onClick={stopCamera} className={classes.button}>
          <Icon>close</Icon>
        </IconButton>
      </DialogActions>
    </Dialog>
  )
);
