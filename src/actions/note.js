import uuid from 'uuid/v4';
import { NOTE_ACTION_TYPE } from '../constants';
import { noteStore } from '../services/db';

/**
 * @typedef {{id: string, title: string, content: string}} Note
 */

/**
 * @param {Note[]} notes
 */
export const setNotes = notes => ({
  type: NOTE_ACTION_TYPE.SET_NOTES,
  payload: notes
});

/**
 *
 * @param {Note} note
 */
export const addNote = note => ({
  type: NOTE_ACTION_TYPE.ADD_NOTE,
  payload: note
});

/**
 *
 * @param {Note} note
 */
export const updateNote = note => ({
  type: NOTE_ACTION_TYPE.UPDATE_NOTE,
  payload: note
});

/**
 *
 * @param {Note} note
 */
export const removeNote = note => ({
  type: NOTE_ACTION_TYPE.REMOVE_NOTE,
  payload: note
});

/* thunk action */

/**
 *
 * @param {string} title
 * @param {string} content
 * @param {[File]} images
 * @param {[File]} attachments
 */
export const initAddNote = (title, content, images, attachments) => dispatch => {
  const note = {
    id: uuid(),
    createdOn: new Date(),
    title,
    content,
    images,
    attachments
  };

  noteStore.add(note).then(() =>
    dispatch(
      addNote({
        id: note.id,
        createdOn: note.createdOn,
        title,
        content
      })
    )
  );
};

/**
 *
 * @param {string} id
 * @param {Date} createdOn
 * @param {string} title
 * @param {string} content
 * @param {[File]} images
 * @param {[File]} attachments
 */
export const initUpdateNote = (
  id,
  createdOn,
  title,
  content,
  images,
  attachments
) => dispatch => {
  noteStore
    .set(id, {
      id,
      title,
      content,
      images,
      attachments
    })
    .then(() => dispatch(updateNote(id, title, content)));
};

/**
 *
 * @param {string} id
 */
export const initRemoveNote = id => dispatch => {
  noteStore.delete(id).then(() => dispatch(removeNote({ id })));
};
