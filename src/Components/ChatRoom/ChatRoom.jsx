import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import './ChatRoom.css';

import ChatRoomMessage from '../ChatRoomMessage/ChatRoomMessage';

class ChatRoom extends React.Component{

  constructor(){
    super();
    this.state = {
      chatroomMessages: [],
      userMessage: ''
    }
  }

  componentDidMount(){
    this.setMessages();
  }

  setMessages(){
    firebase.database().ref('chatroom').once('value').then((snapshot) => {
      this.setState({chatroomMessages: snapshot.val()})
    })
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
    this.setMessages();
  }



  render(){
    // console.log(this.state.chatroomMessages);
    return (
      <div className="chatroom-container">
        <ul className="chatroom-messages">
          {Object.keys(this.state.chatroomMessages).map(messageId => {
            return <ChatRoomMessage
                      key={messageId}
                      message={this.state.chatroomMessages[messageId]}
                      uid={this.props.user.account.uid} />
          })}
        </ul>
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
