import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Nav = () => (
  <nav>
    <div className="main-nav">
      <h1>COMPANYLOGO</h1>
      <NavLink to="/signup" exact className="btn">
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
    </div>
  </nav>
);

export default Nav;
