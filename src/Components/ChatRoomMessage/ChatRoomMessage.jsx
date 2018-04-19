import React from 'react';
import './ChatRoomMessage.css';
var moment = require('moment-timezone');

// const ChatRoomMessage = ({message, uid}) => {
//   return uid === message.uid ? (
//     <li className="chatroom-message-container">
//
//       <p className="chatroom-body f-end"><span className="user-message">{message.body}</span></p>
//
//       <p className="chatroom-body f-end"><input type="text" defaultValue={message.body}/></p>
//     </li>
//    )
//     : //
//    (
//     <li className="chatroom-message-container">
//       <p className="chatroom-author">
//         <span className="chatroom-user-popup">
//           {message.author}
//           <div className="chatroom-user-popup-content">
//             <div className="chatroom-hover-pic"></div>
//             <p>View {message.author}'s Profile</p>
//             <p>{message.uid}</p>
//             <label htmlFor="block-chatroom-user">
//               Block User
//               <input type="checkbox" id="block-chatroom-user"/>
//             </label>
//           </div>
//         </span>
//         <span>{moment(message.timestamp).format('HH:mm')}</span>
//       </p>
//       <p className="chatroom-body"><span className="chat-message">{message.body}</span></p>
//     </li>
//    )
// }
//
// export default ChatRoomMessage;




class ChatRoomMessage extends React.Component{

  constructor(){
    super()
    this.state = {
      editMessage: false
    }
  }

  handleEditMessage = () => {
    this.setState({editMessage: !this.state.editMessage})
  }

  handleDeleteMessage = () => {
    console.log('deleting message');
    this.setState({editMessage: !this.state.editMessage})
  }

  updateMessage = (e) => {
    e.preventDefault();
    console.log('firing updateMessage');
    this.setState({editMessage: !this.state.editMessage})
  }

  render(){
    const {message, uid} = this.props;
    return uid === message.uid ? (
        <li className="chatroom-message-container user-container">

          {this.state.editMessage ?

            <div className={this.state.editMessage ? "chatroom-body add-bkgd-color" :"chatroom-body f-end "}>


              <form onSubmit={this.updateMessage}>
                <input type="text" defaultValue={message.body}/>
                <div className="edit-buttons-container">
                  <div>
                    <div className="edit-btn" onClick={()=>this.handleEditMessage()}>Cancel</div>
                    <div className="edit-btn" onClick={()=>this.handleEditMessage()}>Save Changes</div>
                  </div>
                  <div className="edit-btn edit-delete" onClick={()=>this.handleDeleteMessage()}>Delete</div>
                </div>

              </form>
            </div>
            :

            <div className="chatroom-body f-end">
              <div className="edit-options" onClick={()=>this.handleEditMessage()}>Edit / Delete</div>
              <span className="user-message">{message.body}</span>
            </div>
          }

        </li>
       )
        : //
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
}

export default ChatRoomMessage;
