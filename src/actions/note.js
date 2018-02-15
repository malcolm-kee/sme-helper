import { NOTE_ACTION_TYPE } from '../constants';

export const setNotes = notes => ({
  type: NOTE_ACTION_TYPE.SET_NOTES,
  payload: notes
});
