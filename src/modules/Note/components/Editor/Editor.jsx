import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initAddNote, initUpdateNote, initRemoveNote } from '../../../../actions/note';
import { noteStore } from '../../../../services/db';
import { reduce } from '../../../../utils/fp';

import { EditorView } from './EditorView';

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
    showMenu: false,
    showCanvas: false,
    focusedImage: null
  };

  saveImage = (blob, cb) => {
    this.setState(
      prevState => ({
        images: [...prevState.images, blob]
      }),
      cb
    );
  };

  handleClickRoot = ev => {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  };

  handleCloseMenu = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({
      showMenu: false
    });
  };

  handleToggleMenu = ev => {
    ev.stopPropagation();
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));
  };

  handleToggleCanvas = bool => () => {
    this.setState({
      showCanvas: bool
    });
  };

  handleCanvasSave = blob => {
    this.saveImage(blob);
    this.handleToggleCanvas(false)();
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
      this.saveImage(image, () => {
        target.value = '';
      });
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

  handleOpenImage = imageIndex => {
    this.setState({ focusedImage: imageIndex });
  };

  handleCloseImage = () => {
    this.setState({ focusedImage: null });
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  setContentRef = ref => (this.contentRef = ref);

  handleContentClick = () => {
    this.contentRef.focus();
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
        showMenu={this.state.showMenu}
        showCanvas={this.state.showCanvas}
        images={this.state.images}
        attachments={this.state.attachments}
        title={this.state.title}
        content={this.state.content}
        focusedImage={this.state.focusedImage}
        setContentRef={this.setContentRef}
        closeMenu={this.handleCloseMenu}
        toggleMenu={this.handleToggleMenu}
        onClickRoot={this.handleClickRoot}
        onCanvasToggle={this.handleToggleCanvas}
        onCanvasSave={this.handleCanvasSave}
        onInputChange={this.handleInputChange}
        onContentClick={this.handleContentClick}
        onImageSelected={this.handleImageSelected}
        onImageRemove={this.handleImageRemove}
        onFileSelected={this.handleFileSelected}
        onFileRemove={this.handleFileRemove}
        onImageOpen={this.handleOpenImage}
        onImageClose={this.handleCloseImage}
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
