import { NOTE_ACTION_TYPE } from '../constants';

const DEFAULT_STATE = {
  data: []
};

const setNotes = (state, action) => ({
  ...state,
  data: action.payload
});

const updateNote = (state, action) => {
  const { id, title, content } = action.payload;
  return {
    ...state,
    data: state.data.map(note => {
      if (note.id !== id) return note;
      return {
        id,
        title,
        content
      };
    })
  };
};

export const noteReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case NOTE_ACTION_TYPE.SET_NOTES:
      return setNotes(state, action);

    case NOTE_ACTION_TYPE.UPDATE_NOTE:
      return updateNote(state, action);

    default:
      return state;
  }
};
