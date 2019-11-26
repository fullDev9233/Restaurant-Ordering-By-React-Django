import React ,{Component} from 'react'
import "materialize-css/dist/css/materialize.min.css";

class Contact extends Component{
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        return (
         <div className="container">
             <br/>
             team3

         </div>
        )
    }
}

export default Contact;