import React from 'react';
import { Form, Icon, Button, Spin} from 'antd';
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import * as actions from '../store/actions/auth'
import './Login.css'
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    }

  handleLogin = () => {
    this.props.onAuth(this.state.username, this.state.password, ()=>{this.props.history.push("/")})
      this.setState({
          username: '',
          password: '',
      })

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  render() {
    let errorMessage = null;
    if(this.props.error){
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }
    return (
        <div id="login">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            {errorMessage}
            {
                this.props.loading ? 
                (<Spin indicator={antIcon} />)
                :
                (
                    <div id="login-page" className="row">
                        <div className="col s12 z-depth-6 card-panel">
                   
                        <form className="login-form">
                            <div className="row">
                            </div>
                            <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input value={this.state.username} onChange={this.handleChange} className="validate" id="username" type="text"/>
                                <label htmlFor="username" data-error="wrong" data-success="right">username</label>
                            </div>
                            </div>
                            <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock_outline</i>
                                <input value={this.state.password} onChange={this.handleChange} id="password" data-length="10" type="password"/>
                                <label htmlFor="password">Password</label>
                            </div>
                            </div>
                            <div className="row">
                            <div className="input-field col s12">
                                <Button htmlType="submit" className ="btn waves-effect waves-light col s12" onClick={this.handleLogin}>Login</Button>
                            </div>
                            </div>
                            <div className="row">
                            <div className="input-field col s6 m6 l6">
                                <p className="margin medium-small"><NavLink style={{marginRight: '10px'}} to="/signup/">Register Now!</NavLink> </p>
                            </div>  
                            </div>

                        </form>
                        </div>
                    </div>
                )
            }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, callback) => dispatch(actions.authLogin(username, password, callback))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);