import React ,{Component} from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class CustomSlider extends Component{

    componentDidMount() {
        const slider = document.querySelector('.slider');
        M.Slider.init(slider, {
            indicators: false,
            height: 500,
            transition: 500,
            interval:6000
        })
    
      }

    render() {
        return (
            <section className="slider">
                <ul className="slides">
                <li>
                    <img src="images/image1.jpg" alt="slider"/>
                    <div className="caption center-align">
                    <h3><b></b></h3>
                    <h5 className="light grey-text text-lighten-3"><b></b></h5>
                    </div>
                </li>
                <li>
                    <img src="images/image2.jpg" alt="slider"/>
                    <div className="caption left-align">
                    <h3><b></b></h3>
                    <h5 className="light grey-text text-lighten-3"><b></b></h5>
                    </div>
                </li>
                <li>
                    <img src="images/image3.jpg" alt="slider"/>
                    <div className="caption right-align">
                    <h3><b></b></h3>
                    <h5 className="light grey-text text-lighten-3"><b></b></h5>
                    </div>
                </li>
                <li>
                    <img src="images/image4.jpg" alt="slider"/>
                    <div className="caption center-align">
                    <h3><b></b></h3>
                    <h5 className="light grey-text text-lighten-3"><b></b></h5>
                    </div>
                </li>
                </ul>
            </section>
        )
    }
}

export default CustomSlider;