import React from 'react';
import { canvasToBlob, fileToUrl } from '../utils/promise-helper';

const setUpForCanvas = () => {
  document.body.style.touchAction = 'none';
};

const cleanUpCanvas = () => {
  document.body.style.touchAction = null;
};

class HandWriteCanvasContainer extends React.Component {
  canvasRef = React.createRef();
  ctx = null;
  lastX = 0;
  lastY = 0;

  state = {
    isDrawing: false
  };

  extractOffSetFromEvent = e => {
    const { offsetX, offsetY, touches } = e.nativeEvent;
    if (offsetX && offsetY) {
      return { offsetX, offsetY };
    }
    const rect = this.canvasRef.getBoundingClientRect();
    const x = touches[0].clientX - rect.left;
    const y = touches[0].clientY - rect.top;

    return {
      offsetX: x,
      offsetY: y
    };
  };

  initializeCanvas = (width, height) => {
    this.canvasRef.width = width;
    this.canvasRef.height = height;
    this.ctx = this.canvasRef.getContext('2d');
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  };

  getDrawImageParams = (cWidth, cHeight, imageWidth, imageHeight) => {
    if (imageWidth < cWidth) {
      return [];
    }
    const ratio = cWidth / imageWidth;
    return [cWidth, ratio * imageHeight];
  };

  getDrawImageCanvasSize = (cWidth, cHeight, imageWidth, imageHeight) => {
    if (imageWidth < cWidth) {
      return [imageWidth, imageHeight];
    }
    const ratio = cWidth / imageWidth;
    return [cWidth, ratio * imageHeight];
  };

  handleMouseDown = e => {
    const { offsetX, offsetY } = this.extractOffSetFromEvent(e);
    this.lastX = offsetX;
    this.lastY = offsetY;

    this.setState({
      isDrawing: true
    });
  };

  handleMouseMove = e => {
    const { color } = this.props;
    if (this.state.isDrawing) {
      const { offsetX, offsetY } = this.extractOffSetFromEvent(e);
      const ctx = this.ctx;
      ctx.strokeStyle = color || '#000';
      const lastX = this.lastX;
      const lastY = this.lastY;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      this.lastX = offsetX;
      this.lastY = offsetY;
    }
  };

  handleMouseUp = e => {
    this.setState({
      isDrawing: false
    });
  };

  handleSave = () => {
    const { onSave } = this.props;
    canvasToBlob(this.canvasRef, 'image/png')
      .then(blob => onSave(blob))
      .catch(err => console.error('in HandWriteCanvas handleSave', err));
  };

  componentDidMount() {
    const { width, height, image } = this.props;
    setUpForCanvas();
    if (image) {
      const img = new Image();
      img.onload = () => {
        const params = this.getDrawImageParams(
          width,
          height,
          img.naturalWidth,
          img.naturalHeight
        );
        const [cvWidth, cvHeight] = this.getDrawImageCanvasSize(
          width,
          height,
          img.naturalWidth,
          img.naturalHeight
        );
        this.initializeCanvas(cvWidth, cvHeight);
        this.ctx.drawImage(img, 0, 0, ...params);
      };
      img.src = fileToUrl(image);
    } else {
      this.initializeCanvas(width, height);
    }
  }

  componentWillUnmount() {
    cleanUpCanvas(this.eventListener);
  }

  render() {
    const { render } = this.props;
    const canvasNode = (
      <canvas
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        ref={ref => (this.canvasRef = ref)}
      />
    );
    return typeof render === 'function'
      ? render(canvasNode, this.handleSave)
      : canvasNode;
  }
}

export const HandWriteCanvas = HandWriteCanvasContainer;
