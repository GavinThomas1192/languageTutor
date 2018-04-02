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