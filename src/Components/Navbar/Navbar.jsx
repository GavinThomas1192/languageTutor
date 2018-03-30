import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Nav = () => (
  <nav>
    <section>
      <aside className="NavAside">
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
      </aside>
      <aside>
        <NavLink to="/Signup" className="btn">
          Sign up
        </NavLink>
        <NavLink to="/Login" className="btn">
          Login
        </NavLink>
      </aside>
    </section>
  </nav>
);

export default Nav;
