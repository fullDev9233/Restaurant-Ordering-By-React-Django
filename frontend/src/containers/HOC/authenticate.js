import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export default function(ComposedComponent){
	class Authentication extends Component{
		componentDidMount() {
			const {authenticated} = this.props;
            console.log(authenticated)
			if(!authenticated){
				this.props.history.push('/login');
			}else{
				this.props.history.push('/');
				console.log(123123)
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