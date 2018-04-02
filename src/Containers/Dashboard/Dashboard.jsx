import React from 'react';
import {connect } from 'react-redux'
import './Dashboard.css';


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(
            'DASHBOARD MOUNTED ===> (this.props, this.state)', this.props, this.state
        )
    }
    componentDidUpdate() {
        console.log('DASHBOARD UPDATED ===> (this.props)', this.props)
    }

    

    render() {
        return(
            <div>
                 <h1>Hello from the dashboard</h1> 
                 {/* {this.props.user.account !== undefined ?
                 <div>
                 <h5>{this.props.user.account.name}</h5>
                <h5>{this.props.user.account.username}</h5>
                 <h5>{this.props.user.account.email}</h5>
                 <h5>{this.props.user.account.age}</h5>
                 <h5>{this.props.user.account.timeZone}</h5>
                 <h5>{this.props.user.account.nativeLanguage}</h5>
                 <h5>{this.props.user.account.isTeacher ? 'Im a teacher' : 'Im a student'}</h5>
                 </div>
                 : undefined } */}

            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
  });
  
  const mapDispatchToProps = dispatch => ({
  
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);