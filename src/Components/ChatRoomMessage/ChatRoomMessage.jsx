import React from 'react';
import './ChatRoomMessage.css';
var moment = require('moment-timezone');

const ChatRoomMessage = ({message, uid}) => {

  return uid === message.uid ? (
    <li className="chatroom-message-container">
      <p className="chatroom-body f-end"><span className="user-message">{message.body}</span></p>
    </li>
   )
    :
   (
    <li className="chatroom-message-container">
      <p className="chatroom-author"><span>{message.author}</span> <span>{moment(message.timestamp).format('HH:mm')}</span></p>
      <p className="chatroom-body"><span className="chat-message">{message.body}</span></p>
    </li>
   )
}

export default ChatRoomMessage;
