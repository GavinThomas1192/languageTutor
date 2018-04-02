import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // USE THIS LATER FOR ANIMATIONS
import './Modal.css';

const clostBtn = () => {
  this.props.showClose ? <button onClick={this.props.close}> Close </button> : ''
}

class Modal extends React.Component {

  //Clicking on background will close the modal via props.close
  bgClick = e => {
    if(e.target === e.currentTarget){
      return this.props.close;
    }
  }

  render(){
    const closeBtn = this.props.showClose ? <button onClick={this.props.close}> Close </button> : '';
    // const deleteBtn = this.props.showDelete ?
    //     <div>
    //       <button onClick={this.props.close}>Cancel</button>
    //       <button onClick={()=>{this.props.close(); this.props.deleteFunc(this.props.deleteId)}}>Delete</button>
    //     </div>
    //   : '';
    const continueBtn = this.props.showContinue ?
        <div className="modal-btn-group">
          <button onClick={()=>{this.props.close(); console.log('continue clicked')}}>Continue</button>
          <button onClick={this.props.close}>Cancel</button>

        </div>
      : '';


    //If modal is open, show the children
    if(this.props.isOpen === true) {
      return (
        <div className="modal-bg" onClick={this.bgClick.bind(this)}>
          <div className="modal-main">
            {this.props.children}
            {closeBtn}
            {continueBtn}
          </div>
        </div>
      )
    } else {
      return ''
    }
  }
}

export default Modal;
