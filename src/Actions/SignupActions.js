import firebase from 'firebase'
import {loginRequest} from './LoginActions'
export const handleStudentSignup = (student) => dispatch => {
    console.log('INSIDE SIGNUP ACTIONS, INCOMING STUDENT FOR SINGUP', student)
    // ******** The signup actions only trigger for first time users, no need to check database ********
    firebase.auth().createUserWithEmailAndPassword(student.email, student.password)
        .then((authData) => {
            firebase.auth().signInWithEmailAndPassword(student.email, student.password).then((signupData) => {
                console.log('signed in' , signupData)
            
                let account = {}
                account.uid = authData.uid
                account.email = student.email.toLowerCase()
                account.name = student.name
                account.username = student.username
                account.nativeLanguage = student.nativeLanguage
                account.age = student.age
                account.timeZone = student.timeZone
                account.location = student.location
                account.isteacher = student.isteacher
    
                console.log(authData, account)
       
                student.isTeacher ? 
                firebase.database().ref('teachers/' + authData.uid).set({
                    account
                })
                : 
                firebase.database().ref('students/' + authData.uid).set({
                    account
                })
              });
           
        }).catch((err) => console.log(err));
};




