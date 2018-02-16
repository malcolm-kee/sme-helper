import { NOTE_ACTION_TYPE } from '../constants';

const DEFAULT_STATE = {
  data: []
};

const setNotes = (state, action) => ({
  ...state,
  data: action.payload
});

const addNote = (state, action) => ({
  ...state,
  data: [...state.data, action.payload]
});

const updateNote = (state, action) => {
  const updatedNote = action.payload;
  return {
    ...state,
    data: state.data.map(note => (note.id !== updatedNote.id ? note : updatedNote))
  };
};

const removeNote = (state, action) => {
  const { id } = action.payload;
  return {
    ...state,
    data: state.data.filter(note => note.id !== id)
  };
};

export const noteReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case NOTE_ACTION_TYPE.SET_NOTES:
      return setNotes(state, action);

    case NOTE_ACTION_TYPE.ADD_NOTE:
      return addNote(state, action);

    case NOTE_ACTION_TYPE.UPDATE_NOTE:
      return updateNote(state, action);

    case NOTE_ACTION_TYPE.REMOVE_NOTE:
      return removeNote(state, action);

    default:
      return state;
  }
};
