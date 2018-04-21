import React from 'react';
import firebase from 'firebase';
import './ChatRoomMessage.css';
var moment = require('moment-timezone');

// const ChatRoomMessage = ({message, uid}) => {   return uid === message.uid ?
// (     <li className="chatroom-message-container">
//
//       <p className="chatroom-body f-end"><span
// className="user-message">{message.body}</span></p>
//
//       <p className="chatroom-body f-end"><input type="text"
// defaultValue={message.body}/></p>     </li>    )     : //    (     <li
// className="chatroom-message-container">       <p className="chatroom-author">
//         <span className="chatroom-user-popup">           {message.author}
// <div className="chatroom-user-popup-content">             <div
// className="chatroom-hover-pic"></div>             <p>View {message.author}'s
// Profile</p>             <p>{message.uid}</p>             <label
// htmlFor="block-chatroom-user">               Block User               <input
// type="checkbox" id="block-chatroom-user"/>             </label> </div>
// </span> <span>{moment(message.timestamp).format('HH:mm')}</span>       </p>
// <p className="chatroom-body"><span
// className="chat-message">{message.body}</span></p>     </li>    ) }
//
// export default ChatRoomMessage;

class ChatRoomMessage extends React.Component {

  constructor() {
    super()
    this.state = {
      editMessage: false,
      editedMessage: ''
    }
  }

  handleEditMessage = () => {
    this.setState({
      editMessage: !this.state.editMessage
    })
  }

  handleDeleteMessage = () => {
    this.handleEditMessage();

    let updates = {};
    updates[`/chatroom/${this.props.messageId}`] = null;
    updates[`/users/${this.props.uid}/chatroom/${this.props.messageId}`] = null;

    return firebase
      .database()
      .ref()
      .update(updates);

  }

  updateMessage = (e) => {
    e.preventDefault();
    console.log('firing updateMessage', this.props.message, this.state.editedMessage);
    this.handleEditMessage();

    //only update the database if there's value in editedMessage, othewise cancel
    if(this.state.editedMessage.length >= 1){
      let updates = {};
      updates[`/chatroom/${this.props.messageId}/body`] = this.state.editedMessage;
      updates[`/chatroom/${this.props.messageId}/edited`] = true;
      updates[`/users/${this.props.uid}/chatroom/${this.props.messageId}/body`] = this.state.editedMessage;
      updates[`/users/${this.props.uid}/chatroom/${this.props.messageId}/edited`] = true;
      return firebase.database().ref().update(updates);
    }

  }

  handleChange = name => (event) => {
    this.setState({[name]: event.target.value});
  };

  render() {
    const {message, messageId, uid} = this.props;
    return uid === message.uid
      ? (
        <li className="chatroom-message-container user-container">

          {this.state.editMessage
            ? <div
                className={this.state.editMessage
                ? "chatroom-body add-bkgd-color"
                : "chatroom-body f-end "}>

                <form onSubmit={this.updateMessage}>
                  <input
                    type="text"
                    defaultValue={message.body}
                    onChange={this.handleChange('editedMessage')}/>
                  <div className="edit-buttons-container">
                    <div>
                      <div className="edit-btn" onClick={() => this.handleEditMessage()}>Cancel</div>
                      <input type="submit" className="edit-btn" value="Save Changes" />
                    </div>
                    <div
                      className="edit-btn edit-delete"
                      onClick={() => this.handleDeleteMessage()}>Delete</div>
                  </div>

                </form>
              </div>
            : <div className="chatroom-body f-end">
                <div className="edit-options" onClick={() => this.handleEditMessage()}>
                  Edit / Delete
                </div>

                <div className="user-message-container">
                  <span className="edited-message">{message.edited ? '(edited)' : undefined}</span>

                  <span className="user-message">
                    {message.body}
                  </span>
                </div>

              </div>
}

        </li>
      )
      : //
      (
        <li className="chatroom-message-container">
          <div className="chatroom-author">
            <span className="chatroom-user-popup">
              {message.author}
              <div className="chatroom-user-popup-content">
                <div className="chatroom-hover-pic"></div>
                <p>View {message.author}'s Profile</p>
                <p>{message.uid}</p>
                <label htmlFor="block-chatroom-user">
                  Block User
                  <input type="checkbox" id="block-chatroom-user"/>
                </label>
              </div>
            </span>
            <span>{moment(message.timestamp).format('HH:mm')}</span>
            <span className="edited-message">{message.edited ? '(edited)' : undefined}</span>
          </div>
          <p className="chatroom-body">
            <span className="chat-message">{message.body}</span>
          </p>
        </li>
      )
  }
}

export default ChatRoomMessage;
