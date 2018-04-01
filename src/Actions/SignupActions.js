import firebase from 'firebase'

export const handleStudentSignup = (student) => dispatch => {
    console.log('INSIDE SIGNUP ACTIONS, INCOMING STUDENT FOR SINGUP', student)
    // ******** The signup actions only trigger for first time users, no need to check database ********
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then((authData) => {
    //         // ******** Firebase will create a route with whatever KEY is fed to the .set method ********
    //         // ******** We dont actually want this to avoid deep nesting ********
    //         // ******** So we package up our user.account object and .set(account) without any key value pairs ********
    //         let account = {}
    //         account.email = email.toLowerCase()
    //         account.uid = authData.uid
    //         account.username = username
    //         firebase.database().ref('users/' + authData.uid).set({
    //             account
    //         }).then(() => {
    //             // ******** Now we need to grap a snapshot from the DB to validate account creation and update the redux store locally ********
    //             firebase.database().ref('users/' + authData.uid).once('value').then(function (snapshot) {
    //                 let updatedUser = snapshot.val();
    //             }).then(() => {
    //                 dispatch(userSet(updatedUser));

    //             })
    //         })
    //     }).catch((err) => console.log(err));
};


