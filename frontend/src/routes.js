import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ArticleList from './containers/ArticleListView'
import ArticleDetail from './containers/ArticleDetailView'
import Login from './containers/Login'
import Signup from './containers/Signup'
import { connect } from 'react-redux';

class Routes extends React.Component {
    componentDidMount() {
      console.log('==== Routes mounted!');
    }
  
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={ArticleList} authed={this.props.currentUser}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/articles/:articleID' component={ArticleDetail} authed={this.props.currentUser}/>
                </Switch>
            </div>
        );
    }
}


const mapStateToProps = state => ({ currentUser: state.token });
export default connect(mapStateToProps)(Routes);
