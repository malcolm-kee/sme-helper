/* global ImageCapture */

import { constants } from './constants';
import { canvasToBlob } from './promise-helper';

const streamConstraints = {
  video: {
    deviceId: '',
    facingMode: ['user', 'environment'],
    height: { ideal: 1080 },
    width: { ideal: 1920 }
  }
};

// let supportedConstraints = {};

// if (constants.SUPPORTS_MEDIA_DEVICES) {
//   supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
// }

export class CameraHelper {
  constructor() {
    this.stream = null;
    this.track = null;

    this.photoCapabilities = null;
    this.trackConstraints = {};
  }

  async getCameras() {
    let devices = [];

    if (constants.SUPPORTS_MEDIA_DEVICES) {
      devices = await navigator.mediaDevices.enumerateDevices();
      devices = devices.filter(device => device.kind === 'videoinput');
    }

    return devices;
  }

  async takePhoto(video) {
    if (!constants.SUPPORTS_MEDIA_DEVICES) {
      return null;
    }

    if (constants.SUPPORTS_IMAGE_CAPTURE) {
      const stream = video.srcObject;

      if (!stream) {
        return null;
      }

      const track = stream.getVideoTracks()[0];
      const capture = new ImageCapture(track);
      const settings = {};

      if (this.photoCapabilities) {
        if (this.photoCapabilities.fillLightMode.includes(this.flash)) {
          settings.fillLightMode = this.flash;
        }
      }

      return await capture.takePhoto(settings);
    } else {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      return await canvasToBlob(canvas, constants.IMAGE_TYPE);
    }
  }

  async startStream(deviceId) {
    this.stopStream();

    streamConstraints.video.deviceId = deviceId;

    const stream = await navigator.mediaDevices.getUserMedia(streamConstraints);
    this.stream = stream;
    this.track = stream.getVideoTracks()[0];

    if (constants.SUPPORTS_IMAGE_CAPTURE) {
      const capture = new ImageCapture(this.track);
      this.photoCapabilities = await capture.getPhotoCapabilities();
    }

    this.trackConstraints = {};
    return stream;
  }

  stopStream() {
    if (this.stream) {
      for (const track of this.stream.getVideoTracks()) {
        track.stop();
      }
    }
  }

  getPhotoCapabilities() {
    if (this.photoCapabilities) {
      return {
        flash: this.photoCapabilities.fillLightMode,
        redEyeReduction: this.photoCapabilities.redEyeReduction === 'controllable'
      };
    }

    return {
      flash: [],
      redEyeReduction: false
    };
  }

  getSettings() {
    if (!this.track || !this.track.getSettings) {
      return {};
    }
    return this.track.getSettings();
  }
}
