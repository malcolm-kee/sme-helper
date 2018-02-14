import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Toolbar from 'material-ui/Toolbar';

import './style.css';

// import { constants } from './constants';
// const { SUPPORTS_MEDIA_DEVICES } = constants;

import { Camera } from '../../../../components/Camera';

const decorate = withStyles(theme => {
  const root = {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '90vh'
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

  return { camera, cameraContainer, content, root, button, title };
});

export const EditorView = decorate(
  ({
    cameraShown,
    hasCapture,
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
      <Toolbar>
        <IconButton color="primary" onClick={openCamera} className={classes.button}>
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
      <Camera
        open={cameraShown}
        onPhotoCaptured={onPhotoCaptured}
        onCameraClose={onCameraClosed}
      />
    </div>
  )
);
