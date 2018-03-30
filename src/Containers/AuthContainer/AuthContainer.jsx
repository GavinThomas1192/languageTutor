import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';

const AuthContainer = (props) => {
  console.log(props);
  return props.location.pathname === '/Login' ? (
    <Login />
  ) : (
    <Signup pathname={props.location.pathname} />
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
