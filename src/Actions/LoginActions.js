import firebase from 'firebase'


export const handleStudentLogin = (student) => dispatch => {

    firebase.auth().signInWithEmailAndPassword(student.email, student.password).then((signupData) => {
        console.log('signed in from LOGIN actions' , signupData)

    

    }).catch((err) => console.log(err));
}