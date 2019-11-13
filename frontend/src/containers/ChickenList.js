import React ,{Component} from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import './ChickenList.css'
import StarRatings from 'react-star-ratings';
import axios from 'axios'

class SerachBrand extends Component{
    _isMounted = false;

    state = {
        rating: 0,
        chickens: [],
        search: '',
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get('http://127.0.0.1:8000/api/chickens/')
        .then(res=> {
            if (this._isMounted) {
            this.setState({
                chickens: res.data
            })
        }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    changeRating = ( newRating, name ) => {
        this.setState({
            rating: newRating

        })
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
          search: e.target.value
        });
      }
    render() {
        const chickenList = this.state.chickens.filter( chicken => {
            return chicken.brand.includes(this.state.search)
        })
        console.log(chickenList)
        return (
        <div>
            <section id="search" className="section serction-search darken-1 white-text center">
                <div className="container">
                    <div className="row">
                        <div className="cal s12">
                            <h4><b>Search Brand</b></h4>
                            <div className="imput-field">
                                <input type="text"  onChange={this.handleChange} value={this.state.search} className="white black-text autocomplete" id="autocomplete-input" placeholder="etc..."/>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="popular" className="section section-popular grey lighten-4">
                <div className="container">
                    <div className="row">
                    {chickenList.length > 0 ? (chickenList.map( (chicken) => (
                      <div className="col s12 m6 l4" key={chicken.id}>
                    <div className="card">
                    <div className="card-image">
                        <img height="280" src="images/cimage.jpg" alt=""/>
                    </div>
                    <div className="card-content">
                            <h6><b>{chicken.brand}</b></h6>
                        {chicken.name}
                        <br></br>
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
            ))) : (
            <div className="col s12 m12 l12 center" >
                <div className="card-content">
                    <h6><b>NO DATA</b></h6>
                </div>
            </div>
      
            )
            
            }
                    </div>
                </div>
            </section>

        </div>
        )
    }

}

export default SerachBrand;