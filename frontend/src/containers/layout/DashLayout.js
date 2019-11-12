import React, { Component } from 'react';  
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import './Layout.css'

class DashboardLayout extends Component {
    componentDidMount() {
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });
  
    }
    render(){
      return (
        <div className="page page-dashboard">  
            <div className="navbar-fixed">
                <nav className="white">
                    <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo"><i className="black-text black-icon material-icons">thumb_up</i><b className="black-text">chickenUp</b></a>
                        <a href="/" className="sidenav-trigger" data-target="mobile-nav">
                        <i className="material-icons black-text black-icon">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                            <a className="black-text" href="/"><b>Home</b></a>
                            </li>
                            <li>
                            <a className="black-text" href="#home"><b>mypage</b></a>
                            </li>
                            <li>
                            <a className="black-text" href="#home"><b>contact</b></a>
                            </li>
                            {
                              this.props.isAuthenticated ? 
                              (
                                <li>
                                <a className="black-text" href="/login" onClick={this.props.logout} ><b>logout</b></a>
                                </li>
                              ) : 
                              (
                                <li>
                                <a className="black-text" href="#home"><b>login</b></a>
                                </li>
                              )
                            }

                        </ul>
                    </div>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-nav">
                    <li>
                    <a href="#1">Home</a>
                    </li>
                    <li>
                    <a href="#2">mypage</a>
                    </li>
                    <li>
                    <a href="#3">contact</a>
                    </li>
                    {
                      this.props.isAuthenticated ? (
                        <li>
                        <a href="#home">logout</a>
                        </li>
             
                      ):
                      (
                        <li>
                        <a href="#home">login</a>
                        </li>
                      )
                    }   

     
                </ul>  
                </div>
            <div className="container main">{this.props.children}</div>  
        </div>  
      )
    }
   
  }


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
  }
  
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardLayout))

