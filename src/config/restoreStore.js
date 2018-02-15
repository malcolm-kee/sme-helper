import { noteStore } from '../services/db';
import { setNotes } from '../actions/note';

export const restoreStore = store => {
  noteStore.getAll().then(rawNotes => {
    const notes = rawNotes.map(rawNote => ({
      id: rawNote.id,
      title: rawNote.title,
      content: rawNote.content
    }));
    store.dispatch(setNotes(notes));
  });
};
