import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Toolbar from 'material-ui/Toolbar';

import './style.css';

// import { constants } from './constants';
// const { SUPPORTS_MEDIA_DEVICES } = constants;

const decorate = withStyles(theme => {
  const root = {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '90vh'
  };

  const content = {
    flex: 1
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

  return { camera, cameraContainer, content, root, button };
});

export const EditorView = decorate(
  ({
    setVideoRef,
    setCapturedRef,
    startCamera,
    capturePhoto,
    removePhoto,
    stopCamera,
    toggleCamera,
    onVideoLoadedMetada,
    cameraShown,
    hasCapture,
    enableToggleCamera,
    classes
  }) => (
    <div className={`Note--Editor ${classes.root}`}>
      <div className="title" contentEditable />
      <div className={`content ${classes.content}`} contentEditable />
      <img alt="captured" src="" ref={capture => setCapturedRef(capture)} />
      <Toolbar>
        <IconButton color="primary" onClick={startCamera} className={classes.button}>
          <Icon>add_a_photo</Icon>
        </IconButton>
        <IconButton color="primary" className={classes.button}>
          <Icon>save</Icon>
        </IconButton>
        {hasCapture ? (
          <IconButton color="primary" onClick={removePhoto} className={classes.button}>
            <Icon>delete</Icon>
          </IconButton>
        ) : null}
      </Toolbar>
      <Dialog open={cameraShown} fullScreen>
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
    </div>
  )
);
