import React from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux';

import Spinner from '../Spinner/Spinner';
import ChatRoom from '../ChatRoom/ChatRoom';
import DirectMessenger from '../DirectMessenger/DirectMessenger';

import './TestChat.css'
class TextChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      userToDM: '',
      requestingUserToChat: '',
      loading: false,
      textChatPendingRequest: false,
      allowPendingTextRequest: false,
      showChatroom: true, //show dm's if false
      dmMessagesList: {}
    }
  }

  componentDidMount() {
    console.log('text chat mounted', this.props)
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_changed', (snapshot) => {
        const updatedUser = snapshot.val();
        console.log('Online User Child Changed!', updatedUser);
        // If our account updates we know someone pushed new token and session data onto
        // our DB object (down below we did this)
        if (updatedUser.uid === this.props.user.account.uid) {
          firebase.database()
          // We need the requesting user info to be able to point back to them completing
          // our recursion circle.
            .ref(`onlineUsers/${updatedUser.textChatRoom.requestingUser.uid}`)
            .once('value')
            .then((snapShot2) => {
              const requestingUserProfile = snapShot2.val();
              console.log(requestingUserProfile);
              this.setState({
                requestingUserToChat: requestingUserProfile,
                //  textChatPendingRequest: true,
                allowPendingTextRequest: true
              });
            })
            .catch(err => console.log(err))
        }
      });


      firebase
        .database()
        .ref('users')
        .once('value')
        .then((snapshot) => {
          this.setState({
            users: snapshot.val()
          })
        })


      // firebase.database().ref('users').on('child_changed')
  }

  componentDidUpdate() {
    console.log('text chat updated props, state', this.props, this.state)
  }

  handleStartDM = (user) => {
    console.log('starting dm');
    this.setState({
      userToDM: user
    }, () => {
      // chatRoomKeys
      firebase
        .database()
        .ref(`onlineUsers/${this.props.user.account.uid}/textChatRoom`)
        .set({requestingUser: this.state.userToDM})
        // Set the chatroom token and keys to THE REQUESTING USER (we just clicked them
        // from the list)
        .then(() => {
          firebase
            .database()
            .ref(`onlineUsers/${this.state.userToDM.uid}/textChatRoom`,)
            .set({requestingUser: this.props.user.account})
            // Then store the token and session in state for good measure!
            .then(() => {
              this.setState({loading: false});
            });
        });

    })
  }

  handleChange = name => (event) => {

    this.setState({[name]: event.target.value});

  };

  sendMessage = (e) => {
    e.preventDefault();
    console.log('sending modal message');
    // firebase.database().ref(`users`)
    console.log(this.props.user.account.username, 'user sending message');
    console.log(this.state.userToDM.username, 'requested user');

    console.log(this.state.message, 'messageeee');

    const messageData = {
      uid: this.props.user.account.uid,
      author: this.props.user.account.username,
      body: this.state.message,
      timestamp: Date.now(),
      edited: false
    }

    const newMessageKey = firebase.database().ref(`/users/${this.props.user.account.uid}/dmUsers/${this.state.userToDM.uid}/`).push().key;


    //ADD MESSAGEDATA OBJECT TO USERS DM LIST
    let updates = {}
    updates[`/users/${this.props.user.account.uid}/dmUsers/${this.state.userToDM.uid}/${newMessageKey}`] = messageData;
    updates[`/onlineUsers/${this.props.user.account.uid}/dmUsers/${this.state.userToDM.uid}/${newMessageKey}`] = messageData;
    updates[`/users/${this.state.userToDM.uid}/dmUsers/${this.props.user.account.uid}/${newMessageKey}`] = messageData;
    updates[`/onlineUsers/${this.state.userToDM.uid}/dmUsers/${this.props.user.account.uid}/${newMessageKey}`] = messageData;

    return firebase.database().ref().update(updates);

  }

  // handlePendingUserTextChat = () => {   this.setState({
  // allowPendingTextRequest: true,     textChatPendingRequest: false   }, () =>
  // this.handleStartDM(this.state.userToDM),); };

  render() {
    return (
      <div className="TextChatContainer">

      {/* 'click me' div below switches from chatroom to dm's view */}
        <div style={{margin: '30px'}} onClick={()=>{this.setState({showChatroom: !this.state.showChatroom})}}>CLICK MEEEE</div>

      {this.state.showChatroom ?
        //{/* show chatroom */}

        <div className="chatroom-onlineusers-container">

          <div className="online-users">
            <h3>Online students for CHATTTT</h3>

            <ul>
              {this.props.onlineUsers.map((ele, index) => {
                  return (
                    <li key={index} onClick={() => this.handleStartDM(ele)}>
                      <p>
                        <span>{ele.username}</span>
                      </p>
                    </li>
                  )
                })}
            </ul>

          </div>
          <ChatRoom />


        </div>

        :
        //{/* show dm's */}

        <div className="chatroom-onlineusers-container">
          <div className="online-users">
            <h3>DIRECT MESSAGESSS</h3>
            <ul>
              {Object.keys(this.props.user.dmUsers).map((item, index) => {
                console.log(this.props.user.dmUsers[item], 'item');

                //getting this.state.users from setting state from firebase in componentDidMount. need to change to possible redux store.
                return <li key={index} onClick={()=>this.setState({dmMessagesList: this.props.user.dmUsers[item]})}>{this.state.users[item].account.username}</li>
              })}
            </ul>
          </div>

          <DirectMessenger messages={this.state.dmMessagesList} uid={this.props.user.account.uid}/>
        </div>
      }




        {this.state.allowPendingTextRequest
          ? <div style={{position: 'absolute',top: '50%', bottom: '0px', left: '50%', right: '0px', width: '300px', height: '300px', background: 'green'}}>
              {/* <h2>You are now TEXT chatting with {this.props.user.textChatRoom.requestingUser.username}</h2> */}
              <p>--------------</p>

              <form onSubmit={this.sendMessage}>




                <input
                  style={{
                  height: '50px'
                }}
                  onChange={this.handleChange('message')}
                  id="message"
                  type="text"
                  placeholder='howdy'
                  value={this.state.message}/>
                </form>

            </div>
          : undefined}

        {this.state.textChatPendingRequest
          ? (
            <div>
              <p>{this.state.requestingUserToChat.name}
                wants to text chat!</p>
              <button onClick={this.handlePendingUserTextChat}>
                Accept
              </button>
            </div>
          )
          : (undefined)}

        {this.state.loading
          ? <Spinner/>
          : undefined}
      </div>
    )
  }
}

const mapStateToProps = state => ({onlineUsers: state.onlineUsers, user: state.user});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TextChat);
