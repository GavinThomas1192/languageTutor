import React from 'react';
import {withRouter} from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // USE THIS LATER FOR ANIMATIONS
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }
  bgClick = (e) => {
    // e.preventDefault()
    e.target === e.currentTarget || e.keyCode === 27 ? this.props.close() : undefined
  }
  componentDidMount(){
    document.addEventListener("keydown", this.bgClick, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.bgClick, false);
  }
  render() {
    // return (
    //   this.props.isOpen ?
    //   <div className="modal-bg" onClick={(e) => this.bgClick(e)}>
    //     <div className="modal-main" style={this.props.maxWidth ? {width:this.props.maxWidth}: undefined}>
    //       {this.props.children}
    //
    //       <div className="modal-buttons-container">
    //
    //         { this.props.showClose ? <button onClick={this.props.close}> Close </button> : ''}
    //         { this.props.showContine ?
    //          <button onClick={()=>{this.props.close(); console.log('continue clicked')}} >Continue</button>
    //          : undefined}
    //         { this.props.showCancel ? <button onClick={this.props.close}>Cancel</button> : undefined}
    //         { this.props.showDelete ? <button onClick={this.props.deleteFunc}>Delete</button> : undefined}
    //       </div>
    //
    //     </div>
    //   </div>
    //   : ''
    // )

    if(this.props.isDM && this.props.isOpen){
      return (
        <div className="modal-bg" onClick={(e) => this.bgClick(e)}>
          <div className="modal-main" style={this.props.maxWidth ? {width:this.props.maxWidth}: undefined}>
            {this.props.children}
            MEESSAAGGEEEE

            <div className="modal-buttons-container">
              { this.props.showCancel ? <button onClick={this.props.close}>Cancel</button> : undefined}
              { this.props.showSend ? <button onClick={this.props.deleteFunc}>Send Message</button> : undefined}
            </div>

          </div>
        </div>
      )

    }

      if(this.props.isOpen){
        return (
          <div className="modal-bg" onClick={(e) => this.bgClick(e)}>
            <div className="modal-main" style={this.props.maxWidth ? {width:this.props.maxWidth}: undefined}>
              {this.props.children}

              <div className="modal-buttons-container">

                { this.props.showClose ? <button onClick={this.props.close}> Close </button> : ''}
                { this.props.showContine ?
                 <button onClick={()=>{this.props.close(); console.log('continue clicked')}} >Continue</button>
                 : undefined}
                { this.props.showCancel ? <button onClick={this.props.close}>Cancel</button> : undefined}
                { this.props.showDelete ? <button onClick={this.props.deleteFunc}>Delete</button> : undefined}
              </div>

            </div>
          </div>
        )
      }

      return ('')

  }
}
 export default withRouter(Modal)


 // <div style={{position: 'absolute',top: '50%', bottom: '0px', left: '50%', right: '0px', width: '300px', height: '300px', background: 'green'}}>
 //     {/* <h2>You are now TEXT chatting with {this.props.user.textChatRoom.requestingUser.username}</h2> */}
 //     <p>--------------</p>
 //
 //     <form onSubmit={this.sendMessage}>
 //
 //
 //
 //
 //       <input
 //         style={{
 //         height: '50px'
 //       }}
 //         onChange={this.handleChange('message')}
 //         id="message"
 //         type="text"
 //         placeholder='howdy'
 //         value={this.state.message}/>
 //       </form>
 //
 //   </div>

//  PURE COMP WITHOUT THE ABILITY TO USE ESC KEY!
// const Modal = (props) => {



//   return props.isOpen ?
//   <div className="modal-bg" onClick={(e) => bgClick(e, props.close)}>
//  { document.addEventListener("keydown", (e) => bgClick(e, props.close), false)}
//         <div className="modal-main">
//           {props.children}
//          { props.showClose ? <button onClick={props.close}> Close </button> : ''}
//          { props.showContine ?
//           <button onClick={()=>{props.close(); console.log('continue clicked')}} >Continue</button>
//           : undefined}
//          { props.showCancel ? <button onClick={props.close}>Cancel</button> : undefined}
//         </div>
//       </div>
//   : ''
// }

// export default Modal;
