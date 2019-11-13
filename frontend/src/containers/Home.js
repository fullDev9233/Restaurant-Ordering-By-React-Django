import React ,{Component} from 'react'
import M from "materialize-css";
import axios from 'axios'
import "materialize-css/dist/css/materialize.min.css";
import CustomSlider from './CustomSlider';
import ChickenList from './ChickenList';
class Home extends Component{
    _isMounted = false;

    state = {
        chickens: []
    }
    componentDidMount() {
        this._isMounted = true;

    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        return (
         <div>
             <CustomSlider />
             <ChickenList />

         </div>
        )
    }
}

export default Home;