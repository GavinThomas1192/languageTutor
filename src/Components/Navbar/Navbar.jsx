import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter, Link} from 'react-router-dom';
import './Navbar.css';

import {handleLogout} from '../../Actions/LoginActions';

class Nav extends React.Component {

  constructor(){
    super()
    this.state = {
      ham: false
    }
  }
  logout = () => {
    this
      .props
      .handleLogout()
      .then(() => {
        this
          .props
          .history
          .push('/');
      });
  };

  closeHam = (e) => {
    return this.state.ham ? this.setState({ham: false}) : undefined;
  }

  render() {
    return (
      <nav>
        {this.props.user == null
          ? (
            <div>
              <div className="main-nav" onClick={(e)=>{this.closeHam(e)}}>
                <NavLink to="/">
                  <h1>COMPANYLOGO</h1>
                </NavLink>

                <div className={ this.state.ham ? "hamburger is-active" : "hamburger" } id="hamburger-1"
                    onClick={()=>this.setState({ham: !this.state.ham})}
                >

                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>

                <div className={ this.state.ham ? "links-is-open" : "links" }>
                  <div>
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
                </div>

                <div className="auth-nav">
                  <NavLink to="/Signup" className="btn">
                    Sign up
                  </NavLink>
                  <NavLink to="/Login" className="btn">
                    Login
                  </NavLink>
                </div>
              </div>
            </div>

          )
          : (
            <div>
              <div  className="auth-dashboard">
                <div className="main-nav">
                  <NavLink to="/">
                    <h1>COMPANYLOGO</h1>
                  </NavLink>
                  <NavLink to="/Signup" className="btn">
                    Find A Mentor
                  </NavLink>
                  <NavLink to="/Login" className="btn">
                    Lessons
                  </NavLink>
                </div>

                <div className="auth-nav">
                  <NavLink to="/Profile" className="btn">
                    {this.props.user.account.username}
                  </NavLink>
                  <img src="http://placehold.it/50x/50" alt="placeholder" />
                  <a className="btn" onClick={this.logout}>Logout</a>
                </div>

              </div>


            </div>
          )}

      </nav>
    );
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({
  handleLogout: student => dispatch(handleLogout(student))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
