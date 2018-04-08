import React from 'react';
import {NavLink} from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer>
    <div className="foot-top">
      <h1>LANGUAGETUTOR</h1>

      <div className="foot-courses">
        <h2>Our Courses</h2>
        <ul>
          <li>Introduction</li>
          <li>Greetings</li>
          <li>Goodbyes</li>
          <li>Common Questions</li>
          <li>Advance Topics</li>
        </ul>
      </div>

      <div className="foot-info">
        <h2>Info</h2>
        <NavLink to="/signup" exact className="btn">
          Find A Mentor
        </NavLink>
        <NavLink to="/About" className="btn">
          Our Courses
        </NavLink>
        <NavLink to="/About" className="btn">
          How it works
        </NavLink>
        <NavLink to="/About" className="btn">
          About
        </NavLink>
        <NavLink to="/Contact" className="btn">
          Contact
        </NavLink>
      </div>
    </div>

    <div className="foot-bottom">
      <p>Copyright &copy; {new Date().getFullYear()}
        Language Tutor</p>

      <div className="legal-stuff">
        <NavLink to="/TermAndConditions" className="btn">
          Terms & Conditions
        </NavLink>
        <NavLink to="/PrivacyPolicy" className="btn">
          Privacy Policy
        </NavLink>
        <NavLink to="/Support" className="btn">
          Support
        </NavLink>

        <div className="foot-social">
          <p>Twitter</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
