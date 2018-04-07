import React from 'react';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';

import { HandWriteCanvas } from '../../../components/HandWriteCanvas';

const decorate = withStyles(() => ({
  root: {
    flex: 1,
    overflow: 'hidden'
  },
  mainTools: {
    flex: 1,
    display: 'flex'
  },
  colorInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0
  }
}));

const NoteHandWriteEditorView = decorate(
  ({ canvas, triggerSave, color, handleChangeColor, onClose, classes }) => (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.mainTools}>
            <IconButton color="inherit" onClick={triggerSave}>
              <Icon>save</Icon>
            </IconButton>
            <IconButton component="label" htmlFor="canvas-pen-color" style={{ color }}>
              <Icon>border_color</Icon>
            </IconButton>
            <input
              id="canvas-pen-color"
              value={color}
              type="color"
              onChange={handleChangeColor}
              className={classes.colorInput}
            />
          </div>
          <IconButton color="inherit" onClick={onClose}>
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      {canvas}
    </div>
  )
);

class NoteHandWriteEditorContainer extends React.Component {
  state = {
    color: '#000000'
  };

  handleChangeColor = ev => {
    const { value } = ev.target;
    this.setState({
      color: value
    });
  };

  handleSave = blob => {
    const { onSave } = this.props;
    onSave(blob);
  };

  render() {
    const { onClose, image } = this.props;
    const renderCanvas = (canvas, triggerSave) => {
      return (
        <NoteHandWriteEditorView
          canvas={canvas}
          triggerSave={triggerSave}
          handleChangeColor={this.handleChangeColor}
          color={this.state.color}
          onClose={onClose}
        />
      );
    };
    return (
      <HandWriteCanvas
        onSave={this.handleSave}
        render={renderCanvas}
        color={this.state.color}
        width={window.innerWidth}
        height={window.innerHeight - 56}
        image={image}
      />
    );
  }
}

export const NoteHandWriteEditor = NoteHandWriteEditorContainer;
