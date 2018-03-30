import React from 'react';

import PropTypes from 'prop-types';

import './Signup.css';

const Signup = props =>
  props.pathname === '/teacherSignup' ? (
    <h1>Teacher specific signup form goes here!</h1>
  ) : (
    <h1>Student specific signup form goes here!</h1>
  );

export default Signup;

Signup.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Signup.defaultProps = {
//   pathname: PropTypes.object,
// };
