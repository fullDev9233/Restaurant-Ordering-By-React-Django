import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export default function(ComposedComponent){
	class Authentication extends Component{
		_isMounted = false;

		componentDidMount() {
			const {authenticated} = this.props;
			if(!authenticated){
				this.props.history.push('/login');
			}else{
				this.props.history.push('/');
			}
		}

		render(){
			return <ComposedComponent {...this.props}/>
		}
	} 
	Authentication = withRouter(Authentication);
	function mapStateToProps(state){
		return {
			authenticated:state.token
		}
	}
	return connect(mapStateToProps)(Authentication);
}