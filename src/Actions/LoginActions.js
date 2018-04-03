import firebase from 'firebase';
import { browserHistory } from 'react-router-dom';
import history from '../Lib/browserHistory';

export const userSet = user => ({
  type: 'USER_SET',
  payload: user,
});

export const userCreate = user => ({
  type: 'USER_CREATE',
  payload: user,
});

export const userUpdate = user => ({
  type: 'USER_UPDATE',
  payload: user,
});

export const setFirebaseUserToRedux = user => dispatch =>
  new Promise((resolve, reject) => {
    console.log(user);
    firebase
      .database()
      .ref('users/' + user.uid)
      .once('value')
      .then((snapshot) => {
        const userProfile = snapshot.val();
        console.log(userProfile);
        resolve(dispatch(userSet(userProfile)));
      })
      .then(() => {
        history.push('/dashboard');
      });
  });

export const handleStudentLogin = (student, router) => (dispatch) => {
  console.log('action props', router);
  firebase
    .auth()
    .signInWithEmailAndPassword(student.email, student.password)
    .then((signupData) => {
      console.log('signed in from LOGIN actions', signupData);
      router.push('/dashboard');
    })
    .catch(err => console.log(err));
};

export const handleLogout = student => dispatch =>
  new Promise(
    (resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(dispatch(userSet(null)));
          console.log('Logged user out!');
        });
    },
    (error) => {
      console.log('Logout error', error);
    },
  );
