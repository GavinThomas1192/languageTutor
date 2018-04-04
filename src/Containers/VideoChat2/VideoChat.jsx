import React from 'react';
import {OTSession, OTPublisher, OTStreams, OTSubscriber, createSession} from 'opentok-react';
import firebase from 'firebase'
import {connect} from 'react-redux'
// import {getAllActiveTeachers} from '../../Actions/VideoActions'

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      requestingTeacher: '',
      allUsers: [],
      onlineUsers: []
    };
  }

  componentWillMount() {
    this.sessionHelper = createSession({
      apiKey: `${process.env.REACT_APP_API_KEY}`,
      sessionId: `${process.env.REACT_APP_sessionId}`,
      token: `${process.env.REACT_APP_token}`,
      onStreamsUpdated: (streams) => {
        this.setState({streams});
      }
    });
  }

  componentWillUnmount() {
    this
      .sessionHelper
      .disconnect();
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  componentDidMount() {
    console.log('video chat mounted', this.props)
    firebase
      .database()
      .ref('onlineUsers')
      .once('value')
      .then((snapshot) => {
        const allUsers = snapshot.val();

        console.log('ALLUSERS FROM DATABASE', allUsers);
        Object
          .values(allUsers)
          .map((ele) => {
            ele.isTeacher
              ? this.setState({
                onlineUsers: [
                  ...this.state.onlineUsers,
                  ele
                ]
              }, () => {
                console.log('FINISHED PULLING FULL USER PROFILES', this.state)
              })
              : undefined
          })
      });
  }
  handleTeacherHelpRequest = (ele) => {
    this.setState({requestingTeacher: ele})
    firebase
      .database()
      .ref('users/' + this.props.user.account.uid + '/chatRoomKeys')
      .set({apiKey: `${process.env.REACT_APP_API_KEY}`, sessionId: `${process.env.REACT_APP_sessionId}`, token: `${process.env.REACT_APP_token}`})
      .then(() => {
        firebase
          .database()
          .ref('users/' + this.state.requestingTeacher.uid + '/chatRoomKeys')
          .set({apiKey: `${process.env.REACT_APP_API_KEY}`, sessionId: `${process.env.REACT_APP_sessionId}`, token: `${process.env.REACT_APP_token}`})
      })
  }

  render() {
    const mockTeachers = [
      {
        name: 'omar',
        experience: 'master'
      }, {
        name: 'isuf',
        experience: 'novice'
      }, {
        name: 'john',
        experience: 'non'
      }
    ]
    return (
      <div>
        <div>
          {this.state.onlineUsers.length > 0
            ? <div>
                <p>Teachers online now!</p>

                <ul>
                  {this
                    .state
                    .onlineUsers
                    .map((ele, index) => {
                      return <li key={index} onClick={() => this.handleTeacherHelpRequest(ele)}>{ele.username}-{ele.nativeLanguage}</li>
                    })}

                </ul>
              </div>

            : <ul>No Active Teachers</ul>}
          {this.state.requestingTeacher !== ''
            ? <p>Awesome! We are connecting you to {this.state.requestingTeacher.name}
              </p>
            : undefined}
        </div>
        <div
          style={{
          marginLeft: '30em',
          marginTop: '30em'
        }}>
          <OTPublisher session={this.sessionHelper.session}/> {this
            .state
            .streams
            .map(stream => (<OTSubscriber
              key={stream.id}
              session={this.sessionHelper.session}
              stream={stream}/>))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({
  // getAllActiveTeachers: () => dispatch(getAllActiveTeachers())
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
