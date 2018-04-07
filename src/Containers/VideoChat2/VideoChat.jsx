import React from 'react';
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession,
} from 'opentok-react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import axios from 'axios';

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
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_changed', (snapshot) => {
        const updatedUser = snapshot.val();
        console.log('DB UPDATED!', updatedUser);
        return updatedUser.uid === this.props.user.account.uid
          ? this.setState({
            sessionId: updatedUser.chatRoomKeys.sessionId,
            token: updatedUser.chatRoomKeys.token,
          })
          : undefined;
      });
  }

  componentDidMount() {
    console.log('video chat mounted', this.props);
    firebase
      .database()
      .ref('onlineUsers')
      .once('value')
      .then((snapshot) => {
        const allUsers = snapshot.val();

        console.log('ALLUSERS FROM DATABASE', allUsers);
        Object.values(allUsers).map(ele =>
            ele.isTeacher
              ? this.setState(
                {
                  onlineUsers: [...this.state.onlineUsers, ele],
                },
                () => {
                  console.log(
                    'FINISHED PULLING FULL USER PROFILES',
                    this.state,
                  );
                },
              )
              : undefined,);
      });
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  componentWillUnmount() {
    // this.sessionHelper.disconnect();
    firebase
      .database()
      .ref(`onlineUsers/${this.props.user.account.uid}`)
      .remove();
  }

  handleTeacherHelpRequest = (ele) => {
    this.setState({ requestingTeacher: ele });

    axios.get('http://localhost:3001/api/getTokens').then((data) => {
      console.log(
        'GOT DATA FROM OUR BACKEND',
        data,
        data.data.id,
        data.data.token,
      );
      firebase
        .database()
        .ref(`users/${this.props.user.account.uid}/chatRoomKeys`)
        .set({
          apiKey: `${process.env.REACT_APP_API_KEY}`,
          sessionId: data.data.id,
          token: data.data.token,
        })
        .then(() => {
          firebase
            .database()
            .ref(`onlineUsers/${this.state.requestingTeacher.uid}/chatRoomKeys`)
            .set({
              apiKey: `${process.env.REACT_APP_API_KEY}`,
              sessionId: data.data.id,
              token: data.data.token,
            })
            .then(() => {
              this.setState({
                sessionId: data.data.id,
                token: data.data.token,
              });
            });
        });
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.onlineUsers.length > 0 ? (
            <div>
              <p>Teachers online now!</p>

              <ul>
                {this.state.onlineUsers.map((ele, index) => (
                  <li
                    key={index}
                    onClick={() => this.handleTeacherHelpRequest(ele)}
                  >
                    {ele.username}-{ele.nativeLanguage}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul>No Active Teachers</ul>
          )}
          {this.state.requestingTeacher !== '' ? (
            <p>
              Awesome! We are connecting you to{' '}
              {this.state.requestingTeacher.name}
            </p>
          ) : (
            undefined
          )}
        </div>
        <div
          style={{
            marginLeft: '30em',
            marginTop: '30em',
          }}
        >
          {this.state.token !== '' ? (
            <div className="publisherContainer">
              <div>Session Status: </div>

              <OTSession
                apiKey={`${process.env.REACT_APP_API_KEY}`}
                sessionId={this.state.sessionId}
                token={this.state.token}
                onError={this.onSessionError}
                eventHandlers={this.sessionEventHandlers}
              >
                <button
                  onClick={() => {
                    this.setState({ video: !this.state.video });
                  }}
                >
                  {this.state.video ? 'Disable' : 'Enable'} Video
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
                    properties={{ width: 720, height: 720 }}
                    onSubscribe={this.onSubscribe}
                    onError={this.onSubscribeError}
                    eventHandlers={this.subscriberEventHandlers}
                  />
                </OTStreams>
              </OTSession>
            </div>
          ) : (
            <p>No video stream yet</p>
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
