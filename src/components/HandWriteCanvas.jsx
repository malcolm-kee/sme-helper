import React from 'react';
import { canvasToBlob } from '../utils/promise-helper';

const createEventListener = canvas => e => {
  if (e.target === canvas) {
    e.preventDefault();
  }
};

const setUpForCanvas = eventListener => {
  // Prevent scrolling when touching the canvas
  // document.body.addEventListener('touchstart', eventListener, false);
  // document.body.addEventListener('touchend', eventListener, false);
  // document.body.addEventListener('touchmove', eventListener, false);
  document.body.style.touchAction = 'none';
};

const cleanUpCanvas = eventListener => {
  // document.body.removeEventListener('touchstart', eventListener, false);
  // document.body.removeEventListener('touchend', eventListener, false);
  // document.body.removeEventListener('touchmove', eventListener, false);
  document.body.style.touchAction = null;
};

class HandWriteCanvasContainer extends React.Component {
  canvasRef = React.createRef();
  ctx = null;
  eventListener = null;
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
    this.eventListener = createEventListener(this.canvasRef);
    setUpForCanvas(this.eventListener);
    this.canvasRef.width = window.innerWidth - 50;
    this.canvasRef.height = window.innerHeight - 100;
    this.ctx = this.canvasRef.getContext('2d');
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
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
