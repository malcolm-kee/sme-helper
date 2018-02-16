import { noteStore } from '../services/db';
import { setNotes } from '../actions/note';

export const restoreStore = store => {
  noteStore
    .getAll()
    .then(rawNotes => {
      const notes = rawNotes.map(rawNote => ({
        id: rawNote.id,
        title: rawNote.title,
        content: rawNote.content,
        hasImage: rawNote.images && rawNote.images.length > 0 ? true : false,
        hasAttachment:
          rawNote.attachments && rawNote.attachments.length > 0 ? true : false
      }));
      store.dispatch(setNotes(notes));
    })
    .catch(err => console.error('no noteStore'));
};
