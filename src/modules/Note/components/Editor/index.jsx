import React from 'react';

import { CameraHelper } from '../../../../utils/CameraHelper';
import { EditorView } from './view';

export class Editor extends React.Component {
  cameraHelper = null;
  cameras = [];
  videoRef = null;

  async componentDidMount() {
    this.cameraHelper = new CameraHelper();
    const cameras = await this.cameraHelper.getCameras();
    this.cameras = cameras;
  }

  setVideo = videoRef => {
    this.videoRef = videoRef;
  };

  handleCaptureCamera = () => {
    if (this.cameras.length > 0) {
      this.startStream(this.cameras[0].deviceId);
    }
  };

  startStream = async deviceId => {
    const stream = await this.cameraHelper.startStream(deviceId);
    if (this.videoRef !== null) {
      this.videoRef.srcObject = stream;
      this.videoRef.onloadedmetadata = () => {
        this.videoRef.play();
      };
    }
  };

  stopStream = () => {
    this.cameraHelper.stopStream();
    this.videoRef.pause();
  };

  render() {
    return (
      <EditorView
        setRef={this.setVideo}
        captureCamera={this.handleCaptureCamera}
        stopStream={this.stopStream}
      />
    );
  }
}
