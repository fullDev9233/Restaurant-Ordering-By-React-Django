import React ,{Component} from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import CustomSlider from '../components/CustomSlider';
import ChickenList from '../components/ChickenList';
class Home extends Component{

    componentDidMount() {

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