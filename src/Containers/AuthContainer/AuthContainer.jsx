import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../Components/Modal/Modal'
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';

const AuthContainer = (props) => {
  console.log(props);
  return props.location.pathname === '/Login' ? (
    <Modal
    isOpen={true}                  //{/* pass isOpen bool to open modal */}
    close={()=>{return false}}     //{/* pass close function to close modal */}
    showClose={false}              //{/* pass showClose bool to show close button or not */}
    showContinue={true}            //{/* pass showContinue bool to show continue button or not */}
  >
    <Login />
  </Modal>
  ) : (
    <Modal
    isOpen={true}                  //{/* pass isOpen bool to open modal */}
    close={()=>{return false}}     //{/* pass close function to close modal */}
    showClose={false}              //{/* pass showClose bool to show close button or not */}
    showContinue={true}            //{/* pass showContinue bool to show continue button or not */}
  >
    <Signup pathname={props.location.pathname} />
  </Modal>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

// const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, {})(AuthContainer);

AuthContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

AuthContainer.defaultProps = {
  location: PropTypes.object,
};
