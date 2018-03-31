import React from 'react';
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
    flex: 1
  }
}));

const NoteHandWriteEditorView = decorate(
  ({ canvas, triggerSave, color, handleChangeColor, onClose, classes }) => (
    <div className={classes.root}>
      <Toolbar>
        <div className={classes.mainTools}>
          <IconButton color="primary" onClick={triggerSave}>
            <Icon>save</Icon>
          </IconButton>
          <input value={color} type="color" onChange={handleChangeColor} />
        </div>
        <IconButton color="primary" onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
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
    const { onClose } = this.props;
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
      />
    );
  }
}

export const NoteHandWriteEditor = NoteHandWriteEditorContainer;
