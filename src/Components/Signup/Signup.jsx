import React from 'react';
import {connect } from 'react-redux'
import PropTypes from 'prop-types';

import './Signup.css';

import {handleStudentSignup} from '../../Actions/SignupActions'

class Signup extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      name: '',
      username: '',
      password: '',
      age: '',
      email: '',
      timeZone: '',
      location: '',
      nativeLanguage: '',
      isTeacher: false,
      // ERRORRS
      errors: false,
      nameError: '',
      usernameError: '',
      passwordError: '',
      ageError: '',
      emailError: '',
      timeZoneError: '',
      locationError: '',
      nativeLanguageError: '',
      
    }
  }

  componentDidMount () {
    this.setState({timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })  
  }

  componentDidUpdate() {
    console.log('Signup Updated', this.state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    !this.state.errors ? this.props.handleStudentSignup(this.state) : undefined 
  }

  handleCheckBoxToggle = () => {
    this.setState({isTeacher: !this.state.isTeacher})
  }

  handleChange = name => event => {
    //REGEX patterns check errors for details on what they mean
    const nameReg = /^[a-zA-Z0-9_-]{3,15}$/;
    const passwordReg = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,24}$/;
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //No matter what set state to user typing
    this.setState({
      [name]: event.target.value,
    })
    //Check for name errors, if there are errors, set state to represent what the requirements are to be used.
    if(name === 'name') {
      !nameReg.test(event.target.value) ? 
      this.setState({
        nameError: 'Whoops Must be between 3 and 15 characters', errors: true
      }) :  this.setState({
        nameError: '', errors: false
      })
    }
    if(name === 'username') {
      !nameReg.test(event.target.value) ? 
      this.setState({
        usernameError: 'Whoops Must be between 3 and 15 characters', errors: true
      }) :  this.setState({
        usernameError: '', errors: false
      })
    }
    if(name === 'password') {
      !passwordReg.test(event.target.value) ? 
      this.setState({
        passwordError: 'Password be at least 8 characters, two uppercase letter, two numbers, one special character',
        errors: true }) :  this.setState({
        passwordError: '', errors: false
      })
    }
    if(name === 'email') {
      !emailReg.test(event.target.value) ? 
      this.setState({
        emailError: "Whoops that's not a valid email", errors: true
      }) :  this.setState({
        emailError: '', errors: false
      })
    }
    if(name === 'age') {
      !nameReg.test(event.target.value) ? 
      this.setState({
        ageError: 'Whoops you\'re too old', errors: true
      }) :  this.setState({
        ageError: '', errors: false
      })
    }
    if(name === 'nativeLanguage') {
      !nameReg.test(event.target.value) ? 
      this.setState({
        ageError: "Whoops you're too old", errors: true
      }) :  this.setState({
        ageError: '', errors: false
      })
    }
   
    if(name === 'location') {
      event.target.value.length !== 5 && typeof event.target.value !== 'number'
          ? this.setState({ locationError: "Whoops thats not a zip code!", errors: true })
          : this.setState({locationError: '', errors: false });
    }
    
    
  }


  
  render() {
    const stagingNumberArray=[];
    for (var i = 10; i < 110; i++) {
      stagingNumberArray.push(i)
    }
    return(
  this.props.pathname === '/teacherSignup' ? (
    <h1>Teacher specific signup form goes here!</h1>
  ) : (
    <div className="Modal">
    <form onSubmit={this.onSubmit} className="ModalForm">
    <label>
          I want to signup as a teacher:
          <input
            name="isTeacher"
            type="checkbox"
            checked={this.state.isTeacher}
            onChange={this.handleCheckBoxToggle} />
        </label>
        <input onChange={this.handleChange('name')} id="name" type="text" placeholder="Full Name" value={this.state.name} />
        <input onChange={this.handleChange('username')} id="username" type="text" placeholder="Username" />
        <input onChange={this.handleChange('password')} id="password" type="password" placeholder="Password" />
        <input onChange={this.handleChange('email')} id="email" type="email" placeholder="Email" />
        <label>
          Age
          <select value={this.state.age} onChange={this.handleChange('age')}>
           { stagingNumberArray.map((ele, index) => {
              return <option key={index} value={ele}>{ele}</option>
            })}
           
          </select>
        </label>
        {/* <input onChange={this.handleChange('age')} id="age" type="age" placeholder="age" /> */}
        <input onChange={this.handleChange('location')} id="location" type="text" pattern="[0-9]*" placeholder="location" />
        <label>
          Native Language
          <select value={this.state.nativeLanguage} onChange={this.handleChange('nativeLanguage')}>
               <option value={'English'}>English</option>
               <option value={'Igbo'}>Igbo</option>
          </select>
        </label>
        {/* <input onChange={this.handleChange('nativeLanguage')} id="nativeLanguage" type="text" placeholder="nativeLanguage" /> */}
        <button>Log in <i className="fa fa-fw fa-chevron-right"></i></button>
    </form>
    {this.state.errors ? <h4>Whoops something went wrong</h4> : undefined}
</div>

    )
  )
}
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleStudentSignup: student => dispatch(handleStudentSignup(student))

});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
  



Signup.propTypes = {
  pathname: PropTypes.string.isRequired,
};

