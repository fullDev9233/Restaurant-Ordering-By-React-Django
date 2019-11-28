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
            <div className="row">
                <br/><br/>
                <div className="col s12 m4 l4">
                    <div class="center card-panel white">
                        <i className="large material-icons">contacts</i>
                        <h4>email</h4>
                        <p>
                            carboy926@gmail.com
                        </p>
                    </div>
                </div>
                <div className="col s12 m8 l8">
                    <div className="col s12 m12 l12">
                        <div class="card-panel grey">
                            <span class="white-text">If you like the recommended chickens, please send us an email.
                            </span>
                        </div>
                    </div>
                    <div className="col s12 m12 l12">
                        <div class="card-panel grey">
                            <span class="white-text">enjoy chickens!
                            </span>
                        </div>
                    </div>
                </div>

            </div>

         </div>
        )
    }
}

export default Contact;