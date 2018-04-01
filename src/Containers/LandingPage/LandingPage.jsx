import React from 'react';
import { NavLink } from 'react-router-dom';

import './LandingPage.css';

import mentor1 from '../../img/mentor-1.jpg';
import mentor2 from '../../img/mentor-2.jpg';
import mentor3 from '../../img/mentor-3.jpg';
import mentor4 from '../../img/mentor-4.jpg';

const LandingPage = () => (
  <div>
    <div className="hero">
      <div className="hero-text">
        <h3>Learn Your Native Tongue From A Mentor</h3>
        <NavLink to="Signup"><button>Sign Up Today!</button></NavLink>
      </div>
    </div>

    <div className="info">
      <h2>Learn The Igbo Language</h2>
      <div className="online">
        <div className="online-courses">
          <h4>Online Courses</h4>
          <ul>
            <li>video tutorials teaching igbo</li>
            <li>track your progress</li>
            <li>get achievments for your success</li>
          </ul>
        </div>

        <img src="http://placehold.it/450x300" />
      </div>

      <div className="mentors">
        <div className="live-mentorships">
          <h4>Live Mentorships</h4>
          <ul>
            <li>one-on-one guidance</li>
            <li>get help with assingments</li>
            <li>learn your native tongue</li>
          </ul>
        </div>

        <img src="http://placehold.it/450x300" />
      </div>
    </div>

    <div className="our-mentors">
      <h4>Meet Our Mentors</h4>

      <ul>
        <li>
          <img src={mentor1} />
          <div className="mentor-info">
            <h5>Mentor Name</h5>
            <p>
              A local native who loves to teach. She’s got a passion for
              learning and showing that by helping others.
            </p>
          </div>
        </li>
      </ul>
    </div>
    <button>hi buddy</button>
  </div>
);

export default LandingPage;
