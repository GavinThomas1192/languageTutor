import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './DashboardSideBar.css';

class DashboardSideBar extends React.Component {
  constructor() {
    super();

    this.state = {
      showOverview: true,
      showCourses: false,
      showFlashcards: false,
      selectedItem: '',
    };
  }

  componentDidUpdate() {
    console.log(this.state, 'getting here lolz');
  }

  // dynamicSidebarList = () => {
  //   switch (this.state.flashcards) {
  //     case this.state.flashcards === true:
  //       return <p>flashcards!!!</p>;
  //     case this.state.courses === true:
  //       return <p>Courses!</p>;
  //     default:
  //       return <p>Overview!</p>;
  //   }
  // };

  render() {
    const flashcards = [
      { word: 'moon' },
      { word: 'money' },
      { word: 'help' },
      { word: 'computer' },
      { word: 'change' },
      { word: 'food' },
      { word: 'table' },
      { word: 'the' },
      { word: 'pronouns' },
    ];
    const courses = [
      { title: 'course 1', video: 'Basics of Igbo' },
      { title: 'course 2', video: 'Learn Emotions' },
      { title: 'course 4', video: 'Punctuation' },
      { title: 'course 5', video: 'ABCs' },
      { title: 'course 6', video: 'Food' },
      { title: 'course 7', video: 'Animals' },
    ];
    const overview = [
      { stat: '70% Completed Video Courses' },
      { stat: 'Favorite word: "moon"' },
      { stat: 'Favorite Teacher: Adrian' },
    ];

    return (
      <div className="completeContainer">
        <div className="sidebarContainer">
          <p>Dashboard</p>

          <div className="tabButtonContainer">
            <button
              onClick={() =>
                this.setState({
                  showOverview: true,
                  showCourses: false,
                  showFlashcards: false,
                })
              }
            >
              Overview
            </button>
            <button
              onClick={() =>
                this.setState({
                  showOverview: false,
                  showCourses: true,
                  showFlashcards: false,
                })
              }
            >
              Courses
            </button>
            <button
              onClick={() =>
                this.setState({
                  showOverview: false,
                  showCourses: false,
                  showFlashcards: true,
                })
              }
            >
              Flashcards
            </button>
          </div>

          <div className="tabListContainer">
            {this.state.showFlashcards ? (
              <ol>
                {flashcards.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => this.setState({ selectedItem: item })}
                  >
                    {item.word}
                  </li>
                ))}
              </ol>
            ) : (
              undefined
            )}

            {this.state.showCourses ? (
              <ol>
                {courses.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => this.setState({ selectedItem: item })}
                  >
                    {item.title}
                  </li>
                ))}
              </ol>
            ) : (
              undefined
            )}

            {this.state.showOverview ? (
              <ol>
                {overview.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => this.setState({ selectedItem: item })}
                  >
                    {item.stat}
                  </li>
                ))}
              </ol>
            ) : (
              undefined
            )}
          </div>
        </div>
        <div className="selectedContent">
          <h1>main content???</h1>
          {/*  */}
          {this.state.selectedItem !== ''
            ? Object.entries(this.state.selectedItem).map(([key, value]) => `${key} - ${value}`,)
            : 'undefined'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardSideBar),);
