import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import './Layout.css'

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });

  }

  menuClicked(){

  }

  render(){
    return (
      <div className="navbar-fixed">
        <nav className="white">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo"><i className="black-text black-icon material-icons">fastfood</i><b className="black-text">chimilier</b></a>
              <a href="#" className="sidenav-trigger" data-target="mobile-nav">
                <i className="material-icons black-text black-icon" onClick={this.menuClicked}>menu</i>
                </a>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <a className="black-text" href="#home"><b>Home</b></a>
                  </li>
                  <li>
                    <a className="black-text" href="#home"><b>mypage</b></a>
                  </li>
                  <li>
                    <a className="black-text" href="#home"><b>contact</b></a>
                  </li>
                  <li>
                    <a className="black-text" href="#home"><b>login</b></a>
                  </li>
                  <li>
                    <a className="black-text" href="#home"><b>logout</b></a>
                  </li>
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
          <li>
            <a href="#home">login</a>
          </li>
          <li>
            <a href="#home">logout</a>
          </li>
        </ul>  
      </div>
    )
  }
 
}


const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout())
  }
}


export default withRouter(connect(null, mapDispatchToProps)(CustomLayout))

// <Layout className="layout">
// <Header>
//   <div className="logo" />
//   <Menu
//     theme="dark"
//     mode="horizontal"
//     defaultSelectedKeys={['2']}
//     style={{ lineHeight: '64px' }}
//   >
//     <Menu.Item key="1"><Link to="/">Posts</Link></Menu.Item>
//     {
//       this.props.isAuthenticated ? (
//         <Menu.Item key="2" onClick={this.props.logout}>
//           Logout
//           </Menu.Item>

//       ) : (
//          <Menu.Item key="2">
//            <Link to="/login">Login</Link>
//            </Menu.Item>
//       )
//     }

//   </Menu>
// </Header>
// <Content style={{ padding: '0 50px' }}>
//   <Breadcrumb style={{ margin: '16px 0' }}>
//     <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
//     <Breadcrumb.Item><Link to ="/">List</Link></Breadcrumb.Item>
//   </Breadcrumb>
//     <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
//         {this.props.children}</div>
// </Content>
// <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
// </Layout>