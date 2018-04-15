import React from 'react';

const ChatRoomMessage = ({message}) => {

  return (
    <li>{message.author} - {message.body}</li>
  )
}

export default ChatRoomMessage;
