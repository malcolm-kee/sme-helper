import { firebase } from '../config/firebase';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const mapUserToModel = googleUser => ({
  displayName: googleUser.displayName,
  email: googleUser.email,
  photoURL: googleUser.photoURL
});

let authStateChangeSubs = [];

firebase.auth().onAuthStateChanged(gUser => {
  if (gUser) {
    const user = mapUserToModel(gUser);
    authStateChangeSubs.forEach(subscriber => subscriber(user));
  } else {
    authStateChangeSubs.forEach(subscriber => subscriber());
  }
});

export const signInGoogle = () =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        const { user } = result;
        resolve(mapUserToModel(user));
      })
      .catch(err => reject(err));
  });

export const signOut = () =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => resolve())
      .catch(err => reject(err));
  });

/**
 *
 * @param {function} fn
 */
export const subscribeToAuthChange = fn => {
  const user = firebase.auth().currentUser;

  if (user) {
    fn(user);
  }

  authStateChangeSubs = authStateChangeSubs.concat(fn);

  return () => {
    authStateChangeSubs = authStateChangeSubs.filter(sub => sub !== fn);
  };
};
