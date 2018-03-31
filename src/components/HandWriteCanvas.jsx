import React from 'react';
import { canvasToBlob } from '../utils/promise-helper';

class HandWriteCanvasContainer extends React.Component {
  canvasRef = React.createRef();
  ctx = null;
  lastX = 0;
  lastY = 0;

  state = {
    isDrawing: false
  };

  handleMouseDown = e => {
    const { offsetX, offsetY } = e.nativeEvent;
    this.lastX = offsetX;
    this.lastY = offsetY;

    this.setState({
      isDrawing: true
    });
  };

  handleMouseMove = e => {
    const { color } = this.props;
    if (this.state.isDrawing) {
      const { offsetX, offsetY } = e.nativeEvent;
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
    this.canvasRef.width = window.innerWidth - 50;
    this.canvasRef.height = window.innerHeight - 100;
    this.ctx = this.canvasRef.getContext('2d');
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  }

  render() {
    const { render } = this.props;
    const canvasNode = (
      <canvas
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref={ref => (this.canvasRef = ref)}
      />
    );
    return typeof render === 'function'
      ? render(canvasNode, this.handleSave)
      : canvasNode;
  }
}

export const HandWriteCanvas = HandWriteCanvasContainer;
