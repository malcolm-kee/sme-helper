import React from 'react';
import { connect } from 'react-redux';

import { setNotes } from '../../../../actions/note';

import { GalleryView } from './view';

const initialState = {
  showDetails: false,
  detailedTitle: '',
  detailedContent: ''
};

class GalleryContainer extends React.Component {
  state = initialState;

  handleClickNote = id => {
    this.props.history.push(`/note/edit/${id}`);
  };

  handleCloseNote = () => {
    this.setState({
      ...initialState
    });
  };

  render() {
    const { notes } = this.props;

    return (
      <GalleryView
        notes={notes}
        showNoteDetails={this.state.showDetails}
        detailedTitle={this.state.detailedTitle}
        detailedContent={this.state.detailedContent}
        onClickNote={this.handleClickNote}
        onCloseNote={this.handleCloseNote}
      />
    );
  }
}

const mapStateToProps = state => ({
  notes: state.note.data
});

const mapDispatchToProps = dispatch => ({
  dispatchSetNotes(notes) {
    dispatch(setNotes(notes));
  }
});

export const Gallery = connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
