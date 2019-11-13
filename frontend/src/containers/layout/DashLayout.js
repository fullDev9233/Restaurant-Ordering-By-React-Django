import React, { Component } from 'react';  
import { withRouter, Link } from 'react-router-dom'
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
                            <Link className="black-text" to="/"><b>Home</b></Link>
                            </li>
                            <li>
                            <Link className="black-text" to="/mypage"><b>mypage</b></Link>
                            </li>
                            <li>
                            <Link className="black-text" to="/contact"><b>contact</b></Link>
                            </li>
                            {
                              this.props.isAuthenticated ? 
                              (
                                <li>
                                <Link className="black-text" to="/login" onClick={this.props.logout} ><b>logout</b></Link>
                                </li>
                              ) : 
                              (
                                <li>
                                <Link className="black-text" to="#home"><b>login</b></Link>
                                </li>
                              )
                            }

                        </ul>
                    </div>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-nav">
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/mypage">mypage</Link>
                    </li>
                    <li>
                    <Link to="/contact">contact</Link>
                    </li>
                    {
                      this.props.isAuthenticated ? (
                        <li>
                        <Link to="/login" onClick={this.props.logout}>logout</Link>
                        </li>
             
                      ):
                      (
                        <li>
                        <Link to="#home">login</Link>
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

