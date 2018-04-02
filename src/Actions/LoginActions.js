import firebase from 'firebase'
import { browserHistory } from 'react-router-dom'
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


export const setFirebaseUserToRedux = (user) => dispatch => {
    firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {
        // this will either be null or populated with vehicles. 
        let user = snapshot.val();
        dispatch(userSet(user))
    })
}


export const handleStudentLogin = (student, router) => dispatch => {
console.log('action props', this.props)
    firebase.auth().signInWithEmailAndPassword(student.email, student.password).then((signupData) => {
        console.log('signed in from LOGIN actions' , signupData)
        router.history.push('/dashboard')
    }).catch((err) => console.log(err));
}

export const handleLogout = (student) => (dispatch) => {
    return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(() => {
            resolve(dispatch(userSet([])))
            console.log('Logged user out!')
          });
        }, (error) => {
        console.log('Logout error', error)
    })
}