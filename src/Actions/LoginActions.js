import firebase from 'firebase'
export const firstTimeloginAfterSignupRequest = user => dispatch => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((authData) => {
        console.log('signed in' , authData)
    }).catch(function(error) {
       console.log('whoops cant perform first time login after singup!')
        
      });

};