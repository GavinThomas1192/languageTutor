import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import './ChatRoom.css';

import ChatRoomMessage from '../ChatRoomMessage/ChatRoomMessage';

class ChatRoom extends React.Component{

  constructor(){
    super();
    this.state = {
      chatroomMessages: {},
      userMessage: ''
    }
  }

  componentDidMount(){
    //set chatroom messages to state on load
    this.setMessages();


    //add event listener to that adds new message to state when new message is added to db
    firebase.database().ref('chatroom').on('child_added', (snapshot) => {
      const newMessage = snapshot.val();
      if(this.state.chatroomMessages.length <= 0){
        console.log('no messages in didmount');
        //nothing happening intentionally - does not work for .length >= 1
      } else {
        let chatroomMessages = {...this.state.chatroomMessages, newMessage}
        console.log(chatroomMessages, 'ha');
        this.setState({chatroomMessages}, ()=>{
          this.scrollBottom();
        })
      }
    })
  }

  setMessages(){
    firebase.database().ref('chatroom').once('value').then((snapshot) => {
      this.setState({chatroomMessages: snapshot.val()}, () =>{
        this.scrollBottom();
      })
    })
  }

  scrollBottom(){
    //Auto scroll to the bottom when a message is added
    this.scrollChatroom ? this.scrollChatroom.scrollTop = this.scrollChatroom.scrollHeight : undefined;
  }

  handleInputChange = (e) => {
    this.setState({userMessage: e.target.value})
  }

  handleInputSubmit = (e) => {
    e.preventDefault();
    if(this.state.userMessage.length >= 1){
      const messageData = {
        uid: this.props.user.account.uid,
        author: this.props.user.account.username,
        body: this.state.userMessage,
        timestamp: Date.now()
      }
      const newMessageKey = firebase.database().ref('chatroom').push().key
      let updates = {};
      updates[`/chatroom/${newMessageKey}`] = messageData;
      updates[`/users/${this.props.user.account.uid}/chatroom/${newMessageKey}`] = messageData;

      firebase.database().ref().update(updates);
      this.setState({userMessage: ''})
      this.setMessages();
    }
  }



  render(){
    return (
      <div className="chatroom-container">
        <ul className="chatroom-messages" ref={(input)=>this.scrollChatroom = input}>
          {Object.keys(this.state.chatroomMessages).map(messageId => {
            return <ChatRoomMessage
                      key={messageId}
                      message={this.state.chatroomMessages[messageId]}
                      messageId={messageId}
                      uid={this.props.user.account.uid}
                      updateMessage={this.updateMessage} />

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
