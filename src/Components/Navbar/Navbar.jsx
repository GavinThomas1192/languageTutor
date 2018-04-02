import React from 'react';
import {connect} from 'react-redux'
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import firebase from 'firebase'
import './Navbar.css';

import {handleLogout} from '../../Actions/LoginActions'

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  logout = () => {
    this.props.handleLogout().then(() => {
      this.props.history.push('/')
    })
    
  }
  
    render() {
      return(

    <nav>
      <div className="main-nav">
        <NavLink to="/" ><h1>COMPANYLOGO</h1></NavLink>
        <NavLink to="/Signup" exact className="btn">
          Find A Mentor
        </NavLink>
        <NavLink to="/teacherSignup" className="btn">
          Become A Mentor
        </NavLink>
        <NavLink to="/Signup" className="btn">
          Our Lessons
        </NavLink>
        <NavLink to="/About" className="btn">
          About
        </NavLink>
        <NavLink to="/Contact" className="btn">
          Contact Us
        </NavLink>
      </div>
  
      <div className="auth-nav">
        <NavLink to="/Signup" className="btn">
          Sign up
        </NavLink>
        <NavLink to="/Login" className="btn">
          Login
        </NavLink>
        <button className='btn' onClick={this.logout}>Logout</button>
      </div>
    </nav>
      )
    }
  }

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleLogout: student => dispatch(handleLogout(student))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

