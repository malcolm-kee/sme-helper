import fbase from 'firebase';

const config = {
  apiKey: 'AIzaSyAwuRQeYB9ozpMqz9DYZSVy9VmZAyVLfaw',
  authDomain: 'sme-helper.firebaseapp.com',
  databaseURL: 'https://sme-helper.firebaseio.com',
  projectId: 'sme-helper',
  storageBucket: 'sme-helper.appspot.com',
  messagingSenderId: '155201474315'
};

fbase.initializeApp(config);

export const firebase = fbase;
