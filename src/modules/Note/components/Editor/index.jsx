import React from 'react';
import { connect } from 'react-redux';

import { updateNote } from '../../../../actions/note';
import { reduce } from '../../../../utils/fp';

import { EditorView } from './view';

class EditorContainer extends React.Component {
  state = {
    images: [],
    attachments: [],
    title: this.props.title,
    content: this.props.content,
    menuAnchorEl: null
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

  handleFileSelected = ev => {
    const { target } = ev;
    const files = target.files;

    this.setState(
      prevState => ({
        attachments: reduce(files, (acc, file) => [...acc, file], prevState.attachments)
      }),
      () => {
        target.value = '';
      }
    );
  };

  handleFileRemove = fileIndex => {
    this.setState(prevState => ({
      attachments: [
        ...prevState.attachments.slice(0, fileIndex),
        ...prevState.attachments.slice(fileIndex + 1)
      ]
    }));
  };

  handleImageSelected = ev => {
    const { target } = ev;
    const image = target.files[0];

    this.setState(
      prevState => ({
        images: [...prevState.images, image]
      }),
      () => {
        target.value = '';
      }
    );
  };

  handleImageRemove = imageIndex => {
    this.setState(prevState => ({
      images: [
        ...prevState.images.slice(0, imageIndex),
        ...prevState.images.slice(imageIndex + 1)
      ]
    }));
  };

  handleContentChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    this.props.dispatchUpdateNote(this.state.title, this.state.content);
    this.props.history.goBack();
  };

  render() {
    return (
      <EditorView
        menuAnchor={this.state.menuAnchorEl}
        images={this.state.images}
        attachments={this.state.attachments}
        title={this.state.title}
        content={this.state.content}
        openMenu={this.handleOpenMenu}
        closeMenu={this.handleCloseMenu}
        onContentChange={this.handleContentChange}
        onImageSelected={this.handleImageSelected}
        onImageRemove={this.handleImageRemove}
        onFileSelected={this.handleFileSelected}
        onFileRemove={this.handleFileRemove}
        onSave={this.handleSave}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { title, content } = state.note.data.find(
    note => note.id === Number(ownProps.match.params.id)
  );

  return {
    title,
    content
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchUpdateNote(title, content) {
    dispatch(updateNote(Number(ownProps.match.params.id), title, content));
  }
});

export const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
