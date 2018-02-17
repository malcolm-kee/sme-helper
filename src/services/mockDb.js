const note1 = {
  id: '1293812',
  title: 'Note Title 1',
  content: 'note content 1'
};

const note2 = {
  id: '12932222',
  title: 'Note Title 2',
  content: 'note content II'
};

export const noteStore = {
  get(key) {
    return Promise.resolve(note1);
  },
  add(note) {
    return Promise.resolve();
  },
  set(key, note) {
    return Promise.resolve();
  },
  delete(key) {
    return Promise.resolve();
  },
  clear() {
    return Promise.resolve();
  },
  getAll() {
    return Promise.resolve([note1, note2]);
  },
  keys() {
    return Promise.resolve([note1.id, note2.id]);
  }
};

export default { noteStore };
