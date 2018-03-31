import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer>
    <div className="foot-top">
      <h1>COMPANYLOGO</h1>

      <div className="foot-courses">
        <h4>Our Courses</h4>
        <ul>
          <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
          <li>Course 4</li>
          <li>Course 5</li>
        </ul>
      </div>

      <div className="foot-info">
        <h4>Info</h4>
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
    </div>

    <div className="foot-bottom">
      <p>Copyright &copy; {new Date().getFullYear()} Language Tutor</p>

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
