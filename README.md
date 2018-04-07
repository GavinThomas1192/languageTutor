* To get up and running...

  * Git clone...
  * `yarn` || `npm install`
  * `cd languageTutor`
  * `yarn start` || `npm run start`

- To run tests...

  * `yarn test` || `npm run test`

* To use an .env file...
  * At the root of your directory...
    * `touch .env`
    * Inside .env
      * REACT_APP_SOME_RANDOM_KEY='someRandomKey'
        \*\* Note: you must use REACT_APP

- Firebase hosting url = https://language-tutor-a1bdd.firebaseapp.com/
- Firebase Functions url = https://us-central1-language-tutor-a1bdd.cloudfunctions.net/api/api/getTokens

#### SETUP for server!

* `cd server`
* `npm install`
* `npm run start`

#### env setup FOR SERVER!!!

* `cd server`
* `touch .env`
  REACT_APP_API_KEY=XXXXXX

#### Gavin's Notes

* Firebase Database User Objects...
  * We will need to keep track of certain items we wouldn't normally need to with Firebase just in case we decide to go the NODE/MONGO route.
* Teacher user

  * { UID \
    Full Name \
    Age \
    Username \
    Email \
    Passwords == NEEDS ENCRYPT \
    TimeZone \
    English Proficiency \
    Native Proficiency \
    Student ID's? \
    Past Teaching Sessions \
    IsAdminApproved \
    }

  * Student User

    * { UID \
      Full Name \
      Age \
      Username \
      Email \
      Passwords == NEEDS ENCRYPT \
      TimeZone \
      Language To Learn \
      NativeLanguage \
      Past Teaching Sessions \
      Past Flashcard Tests \
      Overall Ranking?

      }

  * Admin User
    * { UID \
      Full Name \
      Age \
      Username \
      Email \
      Passwords == NEEDS ENCRYPT \
      TimeZone \
      }

### Adrian's Notes
#### User Panel Mockup
![alt text](https://i.imgur.com/1gIn1Ji.jpg)

#### Landing Page
![alt text](https://i.imgur.com/eglRDZU.jpg)
