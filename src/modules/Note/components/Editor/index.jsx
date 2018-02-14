import React from 'react';

import { CameraHelper } from '../../../../utils/CameraHelper';
import { EditorView } from './view';

export class Editor extends React.Component {
  cameraHelper = null;
  cameras = [];
  currentCamera = null;
  videoRef = null;
  capturedRef = null;

  state = {
    cameraShown: false,
    hasCapture: false
  };

  chooseCamera = async camera => {
    this.currentCamera = camera;
    await this.startStream(this.currentCamera.id);
  };

  toggleCamera = () => {
    if (this.cameras.length < 2) {
      return;
    }

    if (this.currentCamera) {
      const currentIndex = this.cameras.indexOf(this.currentCamera);
      this.chooseCamera(this.cameras[(currentIndex + 1) % this.cameras.length]);
    } else {
      this.chooseCamera(this.cameras[0]);
    }
  };

  startStream = async deviceId => {
    const stream = await this.cameraHelper.startStream(deviceId);
    if (this.videoRef !== null) {
      this.videoRef.srcObject = stream;
    }
  };

  stopStream = () => {
    this.cameraHelper.stopStream();
    this.videoRef.pause();
  };

  startCaptureCamera = () => {
    if (this.cameras.length > 0) {
      this.chooseCamera(this.cameras[0]);
    }
  };

  takePhoto = async () => {
    const blob = await this.cameraHelper.takePhoto(this.videoRef);
    if (blob) {
      if (this.capturedRef) {
        const urlCreator = window.URL || window.webkitURL;
        this.capturedRef.src = urlCreator.createObjectURL(blob);
        this.setState({
          hasCapture: true
        });
      } else {
        console.error('capturedRef is null in takePhoto');
      }
    } else {
      console.error('empty blob in takePhoto');
    }
  };

  removePhoto = () => {
    this.capturedRef.src = '';
    this.setState({
      hasCapture: false
    });
  };

  initiateVideo = videoRef => {
    this.videoRef = videoRef;
    this.startCaptureCamera();
  };

  setCapturedRef = capturedRef => {
    this.capturedRef = capturedRef;
  };

  handleStartCamera = () => {
    this.setState({
      cameraShown: true
    });
  };

  handleCapturePhoto = () => {
    this.takePhoto()
      .then(() => this.handleStopCamera())
      .catch(err => console.error(err));
  };

  handleStopCamera = () => {
    this.stopStream();
    this.setState({
      cameraShown: false
    });
  };

  handleOnLoadedMetada = () => {
    this.videoRef.play();
  };

  async componentDidMount() {
    this.cameraHelper = new CameraHelper();
    const cameras = await this.cameraHelper.getCameras();
    this.cameras = cameras;
  }

  render() {
    return (
      <EditorView
        cameraShown={this.state.cameraShown}
        hasCapture={this.state.hasCapture}
        enableToggleCamera={this.cameras.length > 1}
        toggleCamera={this.toggleCamera}
        setVideoRef={this.initiateVideo}
        setCapturedRef={this.setCapturedRef}
        startCamera={this.handleStartCamera}
        capturePhoto={this.handleCapturePhoto}
        removePhoto={this.removePhoto}
        stopCamera={this.handleStopCamera}
        onVideoLoadedMetada={this.handleOnLoadedMetada}
      />
    );
  }
}
