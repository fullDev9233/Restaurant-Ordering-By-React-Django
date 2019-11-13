import React ,{Component} from 'react'
import M from "materialize-css";
import axios from 'axios'
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
         <div>
             ContactContact

         </div>
        )
    }
}

export default Contact;