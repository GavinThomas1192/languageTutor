import React from 'react';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../../Components/Modal/Modal';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: false,
      showModal: true,
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal }, () => {
      this.props.history.push('/');
    });
  };
  render() {
    return (
      <Modal
        isOpen={this.state.showModal} // {/* pass isOpen bool to open modal */}
        close={this.toggleModal} // {/* pass close function to close modal */}
        showClose // {/* pass showClose bool to show close button or not */}
        showContinue={false} // {/* pass showContinue bool to show continue button or not */}
      >
        {this.props.location.pathname === '/Login' ? (
          <Login />
        ) : (
          <Signup pathname={this.props.location.pathname} />
        )}
      </Modal>
    );
  }
}

export default withRouter(AuthContainer);

AuthContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

AuthContainer.defaultProps = {
  location: PropTypes.object,
};
