import firebase from 'firebase'
export const handleStudentSignup = (student, history) => dispatch => {
    console.log('INSIDE SIGNUP ACTIONS, INCOMING STUDENT FOR SINGUP', student)
    // ******** The signup actions only trigger for first time users, no need to check database ********
    firebase.auth().createUserWithEmailAndPassword(student.email, student.password)
        .then((authData) => {
            firebase.auth().signInWithEmailAndPassword(student.email, student.password).then((signupData) => {
            
                let account = {}
                account.uid = authData.uid
                account.email = student.email.toLowerCase()
                account.name = student.name
                account.username = student.username
                account.nativeLanguage = student.nativeLanguage
                account.age = student.age
                account.timeZone = student.timeZone
                account.location = student.location
                account.isTeacher = student.isTeacher
    
       
                
                firebase.database().ref('users/' + authData.uid).set({
                    account
                }, () => {
                    history.push('/dashboard')
                })
               
              });
           
        }).catch((err) => console.log(err));
};




