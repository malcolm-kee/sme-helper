import React from 'react';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import './style.css';

import { constants } from './constants';
const { SUPPORTS_MEDIA_DEVICES } = constants;

const decorate = withStyles(theme => {
  const root = {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '90vh'
  };

  const content = {
    flex: 1
  };

  const button = {
    margin: theme.spacing.unit
  };

  return { content, root, button };
});

export const EditorView = decorate(({ setRef, captureCamera, stopStream, classes }) => (
  <div className={`Note--Editor ${classes.root}`}>
    <div className="title" contentEditable />
    <div className={`content ${classes.content}`} contentEditable />
    <video ref={video => setRef(video)} />
    <Toolbar>
      <Button color="primary" onClick={stopStream} className={classes.button}>
        Stop Camera
      </Button>
      <Button color="primary" onClick={captureCamera} className={classes.button}>
        {SUPPORTS_MEDIA_DEVICES ? 'Camera' : 'Upload'}
      </Button>
      <Button color="primary" className={classes.button}>
        Save
      </Button>
    </Toolbar>
  </div>
));
