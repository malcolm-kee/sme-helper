import React from 'react';
import PropTypes from 'prop-types';

import { CameraHelper } from '../../utils/CameraHelper';
import { CameraView } from './view';

export class Camera extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onCameraClose: PropTypes.func,
    onPhotoCaptured: PropTypes.func.isRequired
  };

  cameraHelper = null;
  cameras = [];
  currentCamera = null;
  videoRef = null;

  chooseCamera = async camera => {
    this.currentCamera = camera;
    await this.startStream(this.currentCamera.deviceId);
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
      const urlCreator = window.URL || window.webkitURL;
      const objUrl = urlCreator.createObjectURL(blob);
      this.props.onPhotoCaptured(objUrl);
    } else {
      console.error('empty blob in takePhoto');
    }
  };

  initiateVideo = videoRef => {
    this.videoRef = videoRef;
    this.startCaptureCamera();
  };

  handleCapturePhoto = () => {
    this.takePhoto()
      .then(() => this.handleStopCamera())
      .catch(err => console.error(err));
  };

  handleStopCamera = () => {
    const { onCameraClose } = this.props;

    this.stopStream();
    if (typeof onCameraClose === 'function') {
      onCameraClose();
    }
  };

  handleOnLoadedMetada = () => {
    this.videoRef.play();
  };

  async componentDidMount() {
    this.cameraHelper = new CameraHelper();
    const cameras = await this.cameraHelper.getCameras();
    this.cameras = cameras;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open === true && this.props.open === false) {
      this.initiateVideo();
    }
  }

  render() {
    return (
      <CameraView
        open={this.props.open}
        enableToggleCamera={this.cameras.length > 1}
        toggleCamera={this.toggleCamera}
        setVideoRef={this.initiateVideo}
        startCamera={this.handleStartCamera}
        capturePhoto={this.handleCapturePhoto}
        stopCamera={this.handleStopCamera}
        onVideoLoadedMetada={this.handleOnLoadedMetada}
      />
    );
  }
}
