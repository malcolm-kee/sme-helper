export const authApi = ({ email, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'malcolm@test.com' && password === '123456') {
        resolve(email);
      } else {
        const error = new Error('Incorrect email/password.');
        reject(error);
      }
    }, 1000);
  });
