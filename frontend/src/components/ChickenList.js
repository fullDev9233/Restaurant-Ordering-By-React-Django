import React ,{Component} from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import './ChickenList.css'
import StarRatings from 'react-star-ratings';
import axios from 'axios'
class SerachBrand extends Component{
    state = {
        rating: 0,

    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/')
        .then(res=> {
            this.setState({
                articles: res.data
            })
        })
    }

    changeRating = ( newRating, name ) => {
        this.setState({
            rating: newRating

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
 

            <section id="popular" className="section section-popular grey lighten-4">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6 l4">
                            <div className="card">
                                <div className="card-image background">
                                    <img height="280"src="images/image2.jpg" alt=""/>
                                    
                                </div>
                                
                                <div className="card-content">
                                    <h5><b>chicken name</b></h5>
                                    lorem, ipsum dolor sit amet
                                    consectete adisppring elit, lofddf
                                    ea deserunt officai, dicat sint 
                                    rererereccd<br></br>
                                    <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="blue"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="2px"
                                    name='rating'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6 l4">
                            <div className="card">
                                <div className="card-image">
                                    <img width="400" height="280" src="images/image1.jpg" alt=""/>
                                </div>
                                <div className="card-content">
                                     <h5><b>chicken name</b></h5>
                                    lorem, ipsum dolor sit amet
                                    consectete adisppring elit, lofddf
                                    ea deserunt officai, dicat sint 
                                    rererereccd<br></br>
                                    <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="blue"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="2px"
                                    name='rating'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6 l4">
                            <div className="card">
                                <div className="card-image">
                                    <img height="280" src="images/image2.jpg" alt=""/>
                                </div>
                                <div className="card-content">
                                      <h5><b>chicken name</b></h5>
                                    lorem, ipsum dolor sit amet
                                    consectete adisppring elit, lofddf
                                    ea deserunt officai, dicat sint 
                                    rererereccd<br></br>
                                    <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="blue"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="2px"
                                    name='rating'
                                    />
                                    
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