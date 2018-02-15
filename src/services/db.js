import idb from 'idb';

const dbPromise = idb.open('app', 1, upgradeDB => {
  if (!upgradeDB.objectStoreNames.contains('note')) {
    upgradeDB.createObjectStore('note');
  }
});

export const noteStore = {
  get(key) {
    return dbPromise.then(db =>
      db
        .transaction('note')
        .objectStore('note')
        .get(key)
    );
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction('note', 'readwrite');
      tx.objectStore('note').put(val, key);
      return tx.complete;
    });
  },
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction('note', 'readwrite');
      tx.objectStore('note').delete(key);
      return tx.complete;
    });
  },
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction('note', 'readwrite');
      tx.objectStore('note').clear();
      return tx.complete;
    });
  },
  getAll() {
    return dbPromise.then(db =>
      db
        .transaction('note')
        .objectStore('note')
        .getAll()
    );
  },
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction('note');
      const keys = [];
      const store = tx.objectStore('note');

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }
};
