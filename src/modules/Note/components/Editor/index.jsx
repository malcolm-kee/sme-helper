import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initAddNote, initUpdateNote, initRemoveNote } from '../../../../actions/note';
import { noteStore } from '../../../../services/db';
import { reduce } from '../../../../utils/fp';

import { EditorView } from './view';

class EditorContainer extends React.Component {
  static propTypes = {
    isNew: PropTypes.bool.isRequired,
    dispatchSave: PropTypes.func.isRequired,
    dispatchRemove: PropTypes.func,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.object
  };

  static defaultProps = {
    title: '',
    content: ''
  };

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

    if (files) {
      this.setState(
        prevState => ({
          attachments: reduce(files, (acc, file) => [...acc, file], prevState.attachments)
        }),
        () => {
          target.value = '';
        }
      );
    }
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
    const image = target.files ? target.files[0] : null;

    if (image) {
      this.setState(
        prevState => ({
          images: [...prevState.images, image]
        }),
        () => {
          target.value = '';
        }
      );
    } else {
      console.error('image is null in handleImageSelected');
    }
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
    const { dispatchSave, createdOn, history } = this.props;
    const { title, content, images, attachments } = this.state;

    dispatchSave(title, content, images, attachments, createdOn);

    history.goBack();
  };

  handleDelete = () => {
    const { history, match } = this.props;
    this.props.dispatchRemove(match.params.id);
    history.goBack();
  };

  componentWillMount() {
    if (this.props.isNew === false) {
      noteStore.get(this.props.match.params.id).then(note => {
        const { images, attachments } = note;
        this.setState({
          images,
          attachments
        });
      });
    }
  }

  render() {
    return (
      <EditorView
        isNew={this.props.isNew}
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
        onDelete={this.handleDelete}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const note = state.note.data.find(note => note.id === ownProps.match.params.id);

  if (note) {
    return {
      isNew: false,
      title: note.title,
      content: note.content,
      createdOn: note.createdOn
    };
  } else {
    return {
      isNew: true
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.location.pathname === '/note/add') {
    return {
      dispatchSave(title, content, images, attachments) {
        dispatch(initAddNote(title, content, images, attachments));
      }
    };
  }
  return {
    dispatchSave(title, content, images, attachments, createdOn) {
      dispatch(
        initUpdateNote(
          ownProps.match.params.id,
          createdOn,
          title,
          content,
          images,
          attachments
        )
      );
    },
    dispatchRemove(id) {
      dispatch(initRemoveNote(id));
    }
  };
};

export const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
