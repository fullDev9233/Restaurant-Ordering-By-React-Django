import React, { Component} from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import 'antd/dist/antd.css';
import requirement from './containers/HOC/authenticate'
/** Layouts **/  
import LoginLayoutRoute from "./containers/layout/LoginLayoutRoute";  
import DashboardRoute from "./containers/layout/DashLayoutRoute";  
  
/** Components **/  
import LoginPage from './containers/Login'
import Signup from './containers/Signup'  
import MyPage from './containers/MyPage'
import Contact from './containers/Contact'
import Home from './containers/Home'  
import ArticleListView from './containers/ArticleListView'  
/* 
   App 
 */  
class App extends Component {  

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {  
    return (  
      <Router>  
        <Switch>  
          <DashboardRoute exact path="/" component={requirement(Home)} />  
          <LoginLayoutRoute exact path="/login" component={requirement(LoginPage)} />
          <LoginLayoutRoute exact path="/signup" component={Signup} /> 
          <DashboardRoute exact path="/mypage" component={MyPage} />  
          <DashboardRoute exact path="/contact" component={Contact} />    
          <DashboardRoute exact path="/articles/:articleID" component={ArticleListView} />  
          <DashboardRoute component={MyPage}/>
        </Switch>  
      </Router>  
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
