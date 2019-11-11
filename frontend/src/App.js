import React, { Component} from 'react';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import BaseRoute from './routes';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends Component{

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render(){
    return (
      <div className="App">
        <Router>
          <CustomLayout {...this.props}>
            <BaseRoute />
          </CustomLayout>
        </Router>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispathcedToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispathcedToProps)(App);
