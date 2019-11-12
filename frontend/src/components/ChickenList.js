import React ,{Component} from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import './ChickenList.css'
import axios from 'axios'
class SerachBrand extends Component{

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/')
        .then(res=> {
            this.setState({
                articles: res.data
            })
        })
    }

    render() {
        return (
        <div>
            <section id="search" className="section serction-search darken-1 white-text center">
                <div className="container">
                    <div className="row">
                        <div className="cal s12">
                            <h3>Search Brand</h3>
                            <div className="imput-field">
                                <input type="text" className="white black-text autocomplete" id="autocomplete-input" placeholder="etc..."/>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="section section-icons grey lighten-4 center">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="card-panel">
                                <img height="120"width="160" src="images/image1.jpg"/>
                                <h4>chicken1</h4>
                                <p>
                                    Loeaar, isdsfp dord ist madid mdfsdfasdfo ,fsdf kcd
                                </p>
                            </div>

                        </div>
                        <div className="col s12 m4">
                            <div className="card-panel">
                                <img height="120"width="160" src="images/image1.jpg"/>
                                <h4>chicken1</h4>
                                <p>
                                    Loeaar, isdsfp dord ist madid mdfsdfasdfo ,fsdf kcd
                                </p>
                            </div>

                        </div>                         <div className="col s12 m4">
                            <div className="card-panel">
                                <img height="120"width="160" src="images/image1.jpg"/>
                                <h4>chicken1</h4>
                                <p>
                                    Loeaar, isdsfp dord ist madid mdfsdfasdfo ,fsdf kcd
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            <section id="popular" className="section section-popular">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="card">
                                <div className="card-image">
                                    <img height="280"src="images/image2.jpg" alt=""/>
                                    <span className="card-title"> Canunu, mxtoc</span>
                                    
                                </div>
                                <div className="card-content">
                                    lorem, ipsum dolor sit amet
                                    consectete adisppring elit, lofddf
                                    ea deserunt officai, dicat sint 
                                    rererereccd
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="card">
                                <div className="card-image">
                                    <img width="400" height="280" src="images/image1.jpg" alt=""/>
                                    <span className="card-title"> Canunu, mxtoc</span>
                                </div>
                                <div className="card-content">
                                    lorem, ipsum dolor sit amet
                                    consectete adisppring elit, lofddf
                                    ea deserunt officai, dicat sint 
                                    rererereccd
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="card">
                                <div className="card-image">
                                    <img height="280" src="images/image2.jpg" alt=""/>
                                    <span className="card-title"> Canunu, mxtoc</span>
                                </div>
                                <div className="card-content">
                                    lorem, ipsum dolor sit amet
                                    consectete adisppring elit, lofddf
                                    ea deserunt officai, dicat sint 
                                    rererereccd
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}

export default SerachBrand;