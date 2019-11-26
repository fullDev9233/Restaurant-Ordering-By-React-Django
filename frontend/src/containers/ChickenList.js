import React ,{Component} from 'react'
import "materialize-css/dist/css/materialize.min.css";
import './ChickenList.css'
import StarRatings from 'react-star-ratings';
import Select from 'react-select'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'
import axios from 'axios'
class SerachBrand extends Component{
    _isMounted = false;

    state = {
        rating: 0,
        brands: [],
        chickens: [],
        search: '',
    }
    
    componentDidMount() {
        this._isMounted = true;

        axios.get('http://127.0.0.1:8000/api/shops')
        .then(res => {
            if (this._isMounted) {
                let shops = res.data
                console.log(shops)
                this.setState({
                    brands: shops
                })
             }
        })
        axios.get('http://127.0.0.1:8000/api/chickens/')
        .then(res=> {
            if (this._isMounted) {
                axios.get('http://127.0.0.1:8000/api/ranking/'+localStorage.name)
                .then( res1 => {
                    let resData = JSON.parse(JSON.stringify(res))
                    let favoriteSet = new Set(res1.data.map(item => item.chickenID));
                    let mychickens = resData.data.results.filter( v => {
                        return !favoriteSet.has(v.id)
                    })
                    this.setState({
                        chickens: mychickens
                    })
                })
            }
        })

    }

    componentWillUnmount() {
        this._isMounted = false;
      }
    changeRating = ( newRating, name ) => {
        let mychickens = this.state.chickens.filter( v => {
            return v.id!=name
        })
        this.props.updateRate(localStorage.name, name, newRating)
        this.setState({
            chickens: mychickens,

        })
    }
    handleChange = (e) => {
        this._isMounted = true;
        if(e.value === 0){
            axios.get('http://127.0.0.1:8000/api/chickens/')
            .then(res=> {
                if (this._isMounted) {
                    axios.get('http://127.0.0.1:8000/api/ranking/'+localStorage.name)
                    .then( res1 => {
                        let resData = JSON.parse(JSON.stringify(res))
                        let favoriteSet = new Set(res1.data.map(item => item.chickenID));
                        let mychickens = resData.data.results.filter( v => {
                            return !favoriteSet.has(v.id)
                        })
                        this.setState({
                            chickens: mychickens
                        })
                    })
                }
            })
        }else{
        axios.get('http://127.0.0.1:8000/api/chickens/?shop='+e.value)
        .then(res => {
            if(this._isMounted) {
                axios.get('http://127.0.0.1:8000/api/ranking/'+localStorage.name)
                .then( res1 => {
                    console.log(res.data)
                    let favoriteSet = new Set(res1.data.map(item => item.chickenID));
                    let mychickens = res.data.results.filter( v => {
                        return !favoriteSet.has(v.id)
                    })
                    // console.log(mychickens)
                    this.setState({
                        chickens: mychickens
                    })
                })
            }
        })
    }
        // this.setState({
        //     search: e.value.name
        // });
    }
    render() {

        if(this.state.mychickens){
            let favoriteSet = new Set(this.state.mychickens.map(item => item.chickenID));
            this.state.chickens = this.state.chickens.filter( v => {
                // console.log(!favoriteSet.has(v.id))
                return !favoriteSet.has(v.id)
            })
        }

        let chickenRating = this.state.chickens.map( (v) => {
            v.rating = 0
            return v
        })
        let chickenList = chickenRating.filter( chicken => {
            return chicken.shop.name.includes(this.state.search)
        })
        const options = [
            { value: 0, label: 'all' }
    
        ]
        if(this.state.brands) {
            let nameSet = this.state.brands;
            nameSet.forEach(v => {
                options.push({value: v.id, label: v.name})
            });
        }
        return (
        <div>
            <section id="search" className="section serction-search darken-1 white-text center">
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h4><b>Select Brand</b></h4>
                            <div className="imput-field">
                                {/* <input type="text"  onChange={this.handleChange} value={this.state.search} className="white black-text autocomplete" id="autocomplete-input" placeholder="etc..."/> */}
                                <Select defaultValue={options[0]} onChange={this.handleChange} className="black-text" options={options} id="select-brand"/>
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
                        <img className="responsive-img" src={chicken.photo} onError={(e)=>{ console.log(1); e.target.onerror = null; e.target.src="images/cimage.jpg"}} alt=""/>
                    </div>
                    <div className="card-content">
                        <h6><b>{chicken.name.slice(0,15)}</b></h6>
                        brand : {chicken.shop.name}
                        <br></br>
                        <StarRatings
                        rating={chicken.rating}
                        starRatedColor="blue"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                        name={chicken.id.toString()}
                        
                        />
                        
                    </div>
                </div>
            </div>
            ))) : (
            <div className="col s12 m12 l12 center" >
                <div className="card-content">
                    <h6><b>NO DATA</b></h6>
                </div>
                <div className="preloader-wrapper active">
                    <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
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


const mapStateToProps = (state) => {
    return {
        chickens: state.chickens,
        name : state.username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChicken: () => dispatch(actions.fetchChicken()),
        updateRate: (username, itemname, rate) =>dispatch(actions.updateRate(username,itemname,rate)),
    }
}
// export default SerachBrand;
export default connect(mapStateToProps,mapDispatchToProps)(SerachBrand);