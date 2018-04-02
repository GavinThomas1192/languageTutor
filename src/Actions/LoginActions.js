import firebase from 'firebase'


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
    dispatch(userSet(user))
}


export const handleStudentLogin = (student) => dispatch => {

    firebase.auth().signInWithEmailAndPassword(student.email, student.password).then((signupData) => {
        console.log('signed in from LOGIN actions' , signupData)

    

    }).catch((err) => console.log(err));
}