import React from 'react';

class DirectMessenger extends React.Component {

  constructor(){
    super();
    this.state = {}
  }

  render(){
    console.log(this.props, 'prop');
    return (



      <div className="chatroom-container">
        <ul className="chatroom-messages" ref={(input) => this.scrollChatroom = input}>
        {Object.keys(this.props.messages).map((messageId, index) => {
          // return <ChatRoomMessage
          //   key={messageId}
          //   message={this.state.chatroomMessages[messageId]}
          //   messageId={messageId}
          //   uid={this.props.user.account.uid}/>
          return <li key={index}>{this.props.messages[messageId].body}</li>
        })}

        </ul>
        <form action="" className="chatroom-form" onSubmit={this.handleInputSubmit}>
          <input
            type="text"
            value={this.state.userMessage}
            onChange={this.handleInputChange}
            placeholder="THIS IS NOT WORKINGGG"/>
          <button>Submit</button>
        </form>
      </div>
    )
  }

}

export default DirectMessenger;
