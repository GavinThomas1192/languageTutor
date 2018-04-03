import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DashboardSideBar extends React.Component {

  constructor(){
    super();

    this.state = {
      showOverview: false,
      showCourses: false,
      showFlashcards: true,
      selectedItem: ''
    }
  }


componentDidUpdate(){
  console.log(this.state, 'getting here lolz');
}

  render(){
    const flashcards = [{word: 'asdljasd'}, {word: 'asa'}, {word: 'fjkgfklh'}]
    const courses = [{title: 'course 1', video: 'urlgoeshere.come'}, {title: 'course 2', video: '.come'}, {title: 'course 3', video: 'adrianisgay.com'}]
    const overview = [{stat: 'progess'}, {stat: 'lessons leared'}, {stat: 'fav teach'}]

    return (
      <div>
        <h1>HELOO FROM DASHBASIEDE HAHA</h1>

        <div>
          <div onClick={()=>this.setState({showOverview: true, showCourses: false, showFlashcards: false})}>Overview</div>
          <div onClick={()=>this.setState({showOverview: false, showCourses: true, showFlashcards: false})}>Courses</div>
          <div onClick={()=>this.setState({showOverview: false, showCourses: false, showFlashcards: true})}>Flashcards</div>
        </div>


        {this.state.showFlashcards ?
          <ul>

            {flashcards.map((item, index) => {
              return <li key={index} onClick={()=>this.setState({selectedItem: item})}>{item.word}</li>
            })}

          </ul>
        : undefined}

        {this.state.showCourses ?
          <ul>

            {courses.map((item, index) => {
              return <li key={index} onClick={()=>this.setState({selectedItem: item})}>{item.title}</li>
            })}

          </ul>
        : undefined
        }

        {this.state.showOverview ?
          <ul>

            {overview.map((item, index) => {
              return <li key={index} onClick={()=>this.setState({selectedItem: item})}>{item.stat}</li>
            })}

          </ul>
          : undefined
        }


        <div>
          <h1>main content???</h1>
          {/*  */}
          {this.state.selectedItem !== '' ? Object.entries(this.state.selectedItem).map(([key, value]) => `${key} - ${value}`) : 'undefined'}
        </div>


      </div>

    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardSideBar))
