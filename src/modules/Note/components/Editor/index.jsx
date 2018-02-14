import React from 'react';

import { EditorView } from './view';

export class Editor extends React.Component {
  capturedRef = null;

  state = {
    cameraShown: false,
    hasCapture: false,
    menuAnchorEl: null
  };

  setCapturedRef = capturedRef => {
    this.capturedRef = capturedRef;
  };

  handleOpenMenu = ev => {
    this.setState({
      menuAnchorEl: ev.currentTarget
    });
  };

  handleCloseMenu = () => {
    this.setState({
      menuAnchorEl: null
    });
  };

  handleOpenCamera = () => {
    this.setState({
      cameraShown: true
    });
  };

  handlePhotoCaptured = objUrl => {
    this.capturedRef.src = objUrl;
    this.setState({
      hasCapture: true
    });
  };

  handleCameraClosed = () => {
    this.setState({
      cameraShown: false
    });
  };

  handleRemovePhoto = () => {
    this.capturedRef.src = '';
    this.setState({
      hasCapture: false
    });
  };

  render() {
    return (
      <EditorView
        menuAnchor={this.state.menuAnchorEl}
        openMenu={this.handleOpenMenu}
        closeMenu={this.handleCloseMenu}
        cameraShown={this.state.cameraShown}
        hasCapture={this.state.hasCapture}
        setCapturedRef={this.setCapturedRef}
        openCamera={this.handleOpenCamera}
        removePhoto={this.handleRemovePhoto}
        onPhotoCaptured={this.handlePhotoCaptured}
        onCameraClosed={this.handleCameraClosed}
      />
    );
  }
}
