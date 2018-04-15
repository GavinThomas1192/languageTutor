import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import './ChatRoom.css';

class ChatRoom extends React.Component{

  constructor(){
    super();

    this.state = {
      chatroomMessages: [],
      userMessage: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({userMessage: e.target.value})
  }

  handleInputSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      uid: this.props.user.account.uid,
      author: this.props.user.account.username,
      body: this.state.userMessage,
      timestamp: Date.now()
    }
    const newMessageKey = firebase.database().ref('chatroom').push().key
    // console.log(newMessageKey, 'key');
    // console.log(messageData, 'messageData');

    let updates = {};

    updates[`/chatroom/${newMessageKey}`] = messageData;
    updates[`/users/${this.props.user.account.uid}/chatroom/${newMessageKey}`] = messageData;

    firebase.database().ref().update(updates);
    this.setState({userMessage: ''})
  }

  render(){
    // console.log(this.props.user, 'propsuser')
    return (
      <div className="chatroom-container">
        <div className="chatroom-messages"></div>
        <form action="" className="chatroom-form" onSubmit={this.handleInputSubmit}>
          <input type="text" value={this.state.userMessage} onChange={this.handleInputChange}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
