import React from 'react';
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession,
  ConnectionStatus,
} from 'opentok-react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../../Components/Spinner/Spinner';

import './VideoChat.css';
// import {getAllActiveTeachers} from '../../Actions/VideoActions'

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      requestingTeacher: '',
      allUsers: [],
      onlineUsers: [],
      sessionId: '',
      token: '',
      audio: false,
      video: false,
      connected: true,
      videoChatPendingRequest: false,
      allowPendingVideoRequest: false,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    // Listening when an online user account changes at all
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_changed', (snapshot) => {
        const updatedUser = snapshot.val();
        console.log('DB UPDATED!', updatedUser);
        if (updatedUser.uid === this.props.user.account.uid) {
          firebase
            .database()
            .ref(`users/${updatedUser.chatRoomKeys.requestingUser}`)
            .once('value')
            .then((snapShot2) => {
              const requestingUserProfile = snapShot2.val();
              console.log(requestingUserProfile);
              this.setState({
                sessionId: updatedUser.chatRoomKeys.sessionId,
                token: updatedUser.chatRoomKeys.token,
                requestingTeacher: requestingUserProfile.account,
                videoChatPendingRequest: true,
              });
            });
        }
      });
    // Listening for when a new online user joins
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_added', (snapshot) => {
        const childAdded = snapshot.val();
        console.log('DB child ADDED!', childAdded);
        childAdded.uid !== this.props.user.account.uid && childAdded.isTeacher
          ? this.setState({
            onlineUsers: [...this.state.onlineUsers, childAdded],
          })
          : undefined;
      });
    // Listening for online user leaving
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_removed', (snapshot) => {
        const childRemoved = snapshot.val();
        console.log('DB child REMOVED!', childRemoved);
        this.setState({
          onlineUsers: this.state.onlineUsers.filter(ele => ele.uid !== childRemoved.uid,),
        });
      });
    // if user closes tab remove from online users
    window.addEventListener('beforeunload', (ev) => {
      return firebase
        .database()
        .ref(`onlineUsers/${this.props.user.account.uid}`)
        .remove();
      firebase
        .database()
        .ref(`users/${this.props.user.account.uid}`)
        .onDisconnect(),
      () => {
        alert('USER DISCONNECTED!');
      };
    });
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  componentWillUnmount() {
    this.setState({ token: '', sessionId: '' });
    // this.sessionHelper.disconnect();
    firebase
      .database()
      .ref(`onlineUsers/${this.props.user.account.uid}`)
      .remove();
    firebase
      .database()
      .ref(`users/${this.props.user.account.uid}`)
      .onDisconnect(),
    () => {
      alert('USER DISCONNECTED!');
    };
  }

  handleTeacherHelpRequest = (ele) => {
    this.setState({ requestingTeacher: ele, loading: true });
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((userIdToken) => {
        // https : //us-central1-language-tutor-a1bdd.cloudfunctions.net/api/api
        // "http://localhost:3001/api/getTokens"
        axios
          .get(
            'https://us-central1-language-tutor-a1bdd.cloudfunctions.net/api/api/getTokens',
            {
              headers: {
                Authorization: `Bearer ${userIdToken}`,
              },
            },
          )
          .then((data) => {
            // console.log("GOT DATA FROM OUR BACKEND", data, data.data.id,
            // data.data.token);
            firebase
              .database()
              .ref(`users/${this.props.user.account.uid}/chatRoomKeys`)
              .set({
                apiKey: `${process.env.REACT_APP_API_KEY}`,
                sessionId: data.data.id,
                token: data.data.token,
                requestingUser: this.state.requestingTeacher,
              })
              .then(() => {
                firebase
                  .database()
                  .ref(`onlineUsers/${
                      this.state.requestingTeacher.uid
                    }/chatRoomKeys`,)
                  .set({
                    apiKey: `${process.env.REACT_APP_API_KEY}`,
                    sessionId: data.data.id,
                    token: data.data.token,
                    requestingUser: this.props.user.account.uid,
                  })
                  .then(() => {
                    this.setState({
                      sessionId: data.data.id,
                      token: data.data.token,
                      loading: false,
                    });
                  });
              });
          });
      });
  };

  handlePendingTeacherVideoRequest = () => {
    this.setState({ allowPendingVideoRequest: true }, () =>
      this.handleTeacherHelpRequest(this.state.requestingTeacher),);
  };

  render() {
    return (
      <div>
        <div>
          {this.state.onlineUsers.length > 0 ? (
            <div className="onlineTeachersContainer">
              <h2>Teachers online now!</h2>
              {this.state.videoChatPendingRequest ? (
                <button onClick={this.handlePendingTeacherVideoRequest}>
                  Accept
                </button>
              ) : (
                undefined
              )}
              <p>Click on their name to connect!</p>
              {this.state.onlineUsers.map((ele, index) => (
                <button
                  className="btn"
                  key={index}
                  onClick={() => this.handleTeacherHelpRequest(ele)}
                >
                  {ele.username}-{ele.nativeLanguage}
                </button>
              ))}
            </div>
          ) : (
            <h2>No Active Teachers</h2>
          )}
          {this.state.loading ? <Spinner /> : undefined}
          {/* {this.state.requestingTeacher !== '' &&
          this.state.token !== '' &&
          this.state.allowPendingVideoRequest ? (
            <h2>Chatting with {this.state.requestingTeacher.name}</h2>
          ) : (
            undefined
          )} */}
        </div>
        <div>
          {this.state.token !== '' && this.state.allowPendingVideoRequest ? (
            <div className="videoContainer">
              <OTSession
                apiKey={`${process.env.REACT_APP_API_KEY}`}
                sessionId={this.state.sessionId}
                token={this.state.token}
                onError={this.onSessionError}
                eventHandlers={this.sessionEventHandlers}
              >
                <button
                  onClick={() => {
                    this.setState({
                      video: !this.state.video,
                    });
                  }}
                >
                  {this.state.video ? 'DISABLE ' : 'ENABLE '}
                  VIDEO
                </button>
                <button
                  onClick={() => {
                    this.setState({ token: '', sessionId: '' });
                  }}
                >
                  DISCONNECT
                </button>
                <OTPublisher
                  properties={{
                    publishAudio: this.state.audio,
                    publishVideo: this.state.video,
                    width: 250,
                    height: 250,
                  }}
                  onPublish={this.state.video}
                  onError={this.onPublishError}
                  eventHandlers={this.publisherEventHandlers}
                />

                <OTStreams>
                  <OTSubscriber
                    properties={{
                      width: 720,
                      height: 720,
                    }}
                    onSubscribe={this.onSubscribe}
                    onError={this.onSubscribeError}
                    eventHandlers={this.subscriberEventHandlers}
                  />
                </OTStreams>
              </OTSession>
            </div>
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  // getAllActiveTeachers: () => dispatch(getAllActiveTeachers())
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
