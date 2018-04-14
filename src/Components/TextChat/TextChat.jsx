import React from 'react'
import {connect} from 'react-redux'

import './TestChat.css'
class TextChat extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   userToDM: ''
  }
 }

 componentDidMount() {
  console.log('text chat mounted', this.props)
 }

 componentDidUpdate() {
  console.log('text chat updated', this.props)
 }

 handleStartDM = (user) => {
  this.setState({userToDM: user})
 }

 render() {
  return (
   <div className="TextChatContainer">
    <h3>Online students for CHATTTT</h3>
    {this
     .props
     .onlineUsers
     .map((ele, index) => {
      return <p onClick={() => this.handleStartDM(ele)}>{ele.username}</p>
     })}

    {this.state.userToDM !== ""
     ? <div>
       <h2>You are now TEXT chatting with {this.state.userToDM.username}</h2>
       <p>--------------</p>
       <p>this is where we need to map conversations</p>
      </div>
     : undefined}
   </div>
  )
 }
}

const mapStateToProps = state => ({onlineUsers: state.onlineUsers});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TextChat);
