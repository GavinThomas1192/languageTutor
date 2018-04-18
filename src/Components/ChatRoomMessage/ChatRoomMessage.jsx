import React from 'react';
import './ChatRoomMessage.css';
var moment = require('moment-timezone');

const ChatRoomMessage = ({message, uid}) => {
console.log(message, 'message');
  return uid === message.uid ? (
    <li className="chatroom-message-container">
      <p className="chatroom-body f-end"><span className="user-message">{message.body}</span></p>
    </li>
   )
    :
   (
    <li className="chatroom-message-container">
      <p className="chatroom-author">
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
      </p>
      <p className="chatroom-body"><span className="chat-message">{message.body}</span></p>
    </li>
   )
}

export default ChatRoomMessage;




// class ChatRoomMessage extends React.Component{
//
//   constructor(){
//     super()
//     this.state = {
//       timer: null
//     }
//   }
//
//   handleMouseEnter = () => {
//     if(!this.state.timer){
//       console.log('starting timer');
//       this.setState({timer: setTimeout(function () {
//           this.setState({timer: null})
//           console.log('entering mouse two seconds ');
//         }.bind(this), 2000)
//       })
//     }
//   }
//
//
//   handleMouseLeave = () => {
//     if(this.state.timer){
//       console.log('timer going');
//       window.clearTimeout(this.state.timer)
//       this.setState({timer: null})
//       console.log('cleared timer');
//     } else {
//       console.log('no timer going');
//     }
//   }
//   render(){
//     const {message, uid} = this.props;
//     return uid === message.uid ? (
//       <li className="chatroom-message-container">
//         <p className="chatroom-body f-end"><span className="user-message">{message.body}</span></p>
//       </li>
//      )
//       :
//      (
//       <li className="chatroom-message-container">
//         <p className="chatroom-author"><span onMouseEnter={()=>this.handleMouseEnter()} onMouseLeave={()=>this.handleMouseLeave()}>{message.author}</span> <span>{moment(message.timestamp).format('HH:mm')}</span></p>
//         <p className="chatroom-body"><span className="chat-message">{message.body}</span></p>
//       </li>
//      )
//   }
// }
//
// export default ChatRoomMessage;
