import React from 'react';
import Signup from '../../Components/Signup/Signup';
import Login from '../../Components/Login/Login';
import './LandingPage.css';

import CoursePreview from '../../Assets/Images/Learn-Preview-Right.png';
import MentorshipsPreview from '../../Assets/Images/Learn-Preview-Left.png';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHomePageSignup: true
    };
  }

  componentDidUpdate() {}
  handleLoginSignup = () => {
    this.setState({
      showHomePageSignup: !this.state.showHomePageSignup
    });
  };

  render() {
    return (
      <div>
        <div className="hero">
          <div className='firstSectionContainer'>
            <div>
              <h1>Learn Your Native Tongue From A Mentor</h1>
              {/* <NavLink to="Signup"><button>Sign Up Today!</button></NavLink> */}
            </div>
            <div className="signup-modal"><Signup/></div>
          </div>
        </div>

        <div className="info">
          <h3>LEARN THE IGBO LANGUAGE</h3>
          <div className="online">
            <div className="online-courses">
              <h4>Online Courses</h4>
              <ul>
                <li>
                  <i className="icon-video"></i>video tutorials teaching igbo</li>
                <li>
                  <i className="icon-statistics"></i>track your progress</li>
                <li>
                  <i className="icon-rewards"></i>get achievments for your success</li>
              </ul>
            </div>

            <img src={CoursePreview} alt="Live Mentorships"/>

          </div>

          <div className="platform">
            <div className="live-mentorships">
              <h4>Live Mentorships</h4>
              <ul>
                <li>
                  <i className="icon-mentorship"></i>one-on-one guidance</li>
                <li>
                  <i className="icon-online-chat"></i>get help with assingments</li>
                <li>
                  <i className="icon-language"></i>learn your native tongue</li>
              </ul>
            </div>

            <img src={MentorshipsPreview} alt="Online Course"/>

          </div>
          <div className="our-mentors">
            <h2>Meet Our Mentors</h2>
            <div className='mentorContainer'>
              <div>

                <img src="http://placehold.it/300x300" alt="mentor"/>
                <div className="mentor-info">
                  <h5>Mentor Name</h5>
                  <p>
                    A local native who loves to teach. She’s got a passion for learning and showing
                    that by helping others.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
