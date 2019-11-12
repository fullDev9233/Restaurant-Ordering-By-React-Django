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
                <ul class="slides">
                <li>
                    <img src="images/b1.jpg"/>
                    <div class="caption center-align">
                    <h3>This is our big Tagline!</h3>
                    <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
                    </div>
                </li>
                <li>
                    <img src="images/b2.jpg"/>
                    <div class="caption left-align">
                    <h3>Left Aligned Caption</h3>
                    <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
                    </div>
                </li>
                <li>
                    <img src="images/b3.jpeg"/>
                    <div class="caption right-align">
                    <h3>Right Aligned Caption</h3>
                    <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
                    </div>
                </li>
                <li>
                    <img src="images/b4.jpg"/>
                    <div class="caption center-align">
                    <h3>This is our big Tagline!</h3>
                    <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
                    </div>
                </li>
                </ul>
            </section>
        )
    }
}

export default CustomSlider;