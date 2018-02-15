import { NOTE_ACTION_TYPE } from '../constants';

const DEFAULT_STATE = {
  data: []
};

const setNotes = (state, action) => ({
  ...state,
  data: action.payload
});

export const noteReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case NOTE_ACTION_TYPE.SET_NOTES:
      return setNotes(state, action);

    default:
      return state;
  }
};
