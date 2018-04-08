import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import VideoChat from '../../Containers/VideoChat2/VideoChat';
import './Dashboard.css';

import helpMentor from '../../Assets/Images/mentor-1.jpg'
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoChat: false,
      showOverview: true,
      showCourses: false,
      showFlashcards: false,
      selectedItem: ''
    };
  }
  componentDidMount() {
    console.log('DASHBOARD MOUNTED ===> (this.props, this.state)', this.props, this.state,);

  }
  componentDidUpdate() {
    console.log('DASHBOARD UPDATED ===> (this.props)', this.props);
  }

  handleShowVideoChat = () => {
    this.setState({
      showVideoChat: !this.state.showVideoChat,
      selectedItem: ''
    });
  };

  render() {
    const flashcards = [
      {
        word: 'moon'
      }, {
        word: 'money'
      }, {
        word: 'help'
      }, {
        word: 'computer'
      }, {
        word: 'change'
      }, {
        word: 'food'
      }
    ];
    const courses = [
      {
        title: 'course 1',
        video: 'Basics of Igbo'
      }, {
        title: 'course 2',
        video: 'Learn Emotions'
      }, {
        title: 'course 4',
        video: 'Punctuation'
      }, {
        title: 'course 5',
        video: 'ABCs'
      }, {
        title: 'course 6',
        video: 'Food'
      }, {
        title: 'course 7',
        video: 'Animals'
      }
    ];
    const overview = [
      {
        stat: '70% Completed Video Courses'
      }, {
        stat: 'Favorite word: "moon"'
      }, {
        stat: 'Favorite Teacher: Adrian'
      }
    ];
    return (
      <div>

        <div className="completeContainer">
          <div className="sidebarContainer">

            <div className="tabButtonContainer">
              <button
                className={this.state.showOverview
                ? 'selectedButton'
                : 'notSelectedButton'}
                onClick={() => this.setState({showOverview: true, showCourses: false, showFlashcards: false, showVideoChat: false})}>
                Overview
              </button>
              <button
                className={this.state.showCourses
                ? 'selectedButton'
                : 'notSelectedButton'}
                onClick={() => this.setState({showOverview: false, showCourses: true, showFlashcards: false, showVideoChat: false})}>
                Courses
              </button>
              <button
                className={this.state.showFlashcards
                ? 'selectedButton'
                : 'notSelectedButton'}
                onClick={() => this.setState({showOverview: false, showCourses: false, showFlashcards: true, showVideoChat: false})}>
                Flashcards
              </button>
            </div>

            <div className="tabListContainer">
              {this.state.showFlashcards
                ? (
                  <ol>
                    {flashcards.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => this.setState({selectedItem: item, showVideoChat: false})}>
                        {index + 1}: {item.word}
                      </li>
                    ))}
                  </ol>
                )
                : (undefined)}

              {this.state.showCourses
                ? (
                  <ol>
                    {courses.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => this.setState({selectedItem: item, showVideoChat: false})}>
                        {index + 1}: {item.title}
                      </li>
                    ))}
                  </ol>
                )
                : (undefined)}

              {this.state.showOverview
                ? (
                  <ol>
                    {overview.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => this.setState({selectedItem: item, showVideoChat: false})}>
                        {index + 1}: {item.stat}
                      </li>
                    ))}
                  </ol>
                )
                : (undefined)}
              <div className='needHelpContainer'>
                <h2>NEED HELP?</h2>
                <img src={helpMentor} alt="online mentor"/>
                <button onClick={this.handleShowVideoChat}>
                  LILLY CAN HELP YOU!
                </button>
              </div>
            </div>
          </div>
          <div className="selectedContent">

            {this.state.selectedItem !== ''
              ? Object
                .entries(this.state.selectedItem)
                .map(([key, value]) => `${key} - ${value}`,)
              : undefined}
            {/* // overview.map((ele, index) => Object.entries(ele).map(([key, value]) => (
              //   <p key={index}>
              //     `${key}
              //     - ${value}`
              //   </p>
              // ))
              // ) */}

            {this.state.showVideoChat
              ? <VideoChat/>
              : undefined}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
