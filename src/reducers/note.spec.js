import { noteReducer } from './note';
import { setNotes, addNote, updateNote, removeNote } from '../actions/note';

jest.mock('../services/db', () => ({
  add() {
    return Promise.resolve();
  },
  set() {
    return Promise.resolve();
  },
  delete() {
    return Promise.resolve();
  }
}));

const note1 = {
  id: '12345',
  title: 'Title 1',
  content: 'Content 1',
  hasImage: true,
  hasAttachment: false
};

const note2 = {
  id: '23453',
  title: 'Title II',
  content: 'Content Two',
  hasImage: false,
  hasAttachment: false
};
const notes = [note1, note2];

describe('noteReducer', () => {
  test('setNoteAction -> data = action.payload', () => {
    const oriState = {
      data: []
    };
    const finalState = {
      data: notes
    };
    const setNoteAction = setNotes(notes);
    expect(noteReducer(oriState, setNoteAction)).toEqual(finalState);
  });

  test('addNoteAction -> data + action.payload', () => {
    const oriState = {
      data: [note1]
    };
    const finalState = {
      data: [note1, note2]
    };
    const addNoteAction = addNote(note2);
    expect(noteReducer(oriState, addNoteAction)).toEqual(finalState);
  });

  test('updateNoteAction -> note >> updatedNote', () => {
    const oriState = {
      data: [note1, note2]
    };
    const updatedNote2 = { ...note2, content: 'Updated Content 2', hasAttachment: true };
    const finalState = {
      data: [note1, updatedNote2]
    };
    const updateNoteAction = updateNote(updatedNote2);
    expect(noteReducer(oriState, updateNoteAction)).toEqual(finalState);
  });

  test('removeNoteAction -> note >> (gone)', () => {
    const oriState = {
      data: [note1, note2]
    };
    const finalState = {
      data: [note1]
    };
    const removeNoteAction = removeNote(note2);
    expect(noteReducer(oriState, removeNoteAction)).toEqual(finalState);
  });
});
