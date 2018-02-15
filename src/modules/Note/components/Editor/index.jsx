import React from 'react';

import { reduce } from '../../../../utils/fp';

import { EditorView } from './view';

export class Editor extends React.Component {
  state = {
    images: [],
    attachments: [],
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

  render() {
    return (
      <EditorView
        menuAnchor={this.state.menuAnchorEl}
        images={this.state.images}
        attachments={this.state.attachments}
        openMenu={this.handleOpenMenu}
        closeMenu={this.handleCloseMenu}
        onImageSelected={this.handleImageSelected}
        onImageRemove={this.handleImageRemove}
        onFileSelected={this.handleFileSelected}
        onFileRemove={this.handleFileRemove}
      />
    );
  }
}
