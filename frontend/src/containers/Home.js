import React ,{Component} from 'react'
import "materialize-css/dist/css/materialize.min.css";
import CustomSlider from './CustomSlider';
import ChickenList from './ChickenList';
import Footer from '../components/Footer'
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
             <Footer />

         </div>
        )
    }
}

export default Home;