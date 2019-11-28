import React ,{Component} from 'react'
import { connect } from 'react-redux';
import './ChickenList.css'
import * as actions from '../store/actions/auth'
import axios from 'axios'
class MyPage extends Component{
    _isMounted = false;
    state = {
        chickens: [],
        recChickens: [],
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get('http://ec2-54-180-8-64.ap-northeast-2.compute.amazonaws.com:8000/api/ranking/'+localStorage.name)
        .then(fav => {
            if(this._isMounted){
                let favoriteSet = new Set(fav.data.map(item => item.chickenID));
                favoriteSet = [...favoriteSet]
                favoriteSet.forEach( id => {
                    axios.get('http://ec2-54-180-8-64.ap-northeast-2.compute.amazonaws.com:8000/api/chickens/'+id)
                    .then( res => {
                        if(this._isMounted){
                            this.setState({
                                chickens: this.state.chickens.concat(res.data)
                            })
                         }
                    })
                })
            }
        })
        axios.get('http://ec2-54-180-8-64.ap-northeast-2.compute.amazonaws.com:8000/api/ranking/rec/'+localStorage.name)
        .then(fav => {
            if(this._isMounted){
                let recommendSet = new Set(fav.data.map(item => item.chickenID));
                recommendSet = [...recommendSet]

                recommendSet.forEach( id => {
                    axios.get('http://ec2-54-180-8-64.ap-northeast-2.compute.amazonaws.com:8000/api/chickens/'+id)
                    .then( res => {
                        if(this._isMounted){
                            this.setState({
                                recChickens: this.state.recChickens.concat(res.data)
                            })
                         }
                    })
                })
            }
        })


    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        const chickenList = this.state.chickens
        const recList = this.state.recChickens
        return (
         <div className="container">
             <div className="row">
                <div className="col s12 m12 l12">
                    <h4><b>My Favorite Chicken</b></h4>

                    <div className="row">
                    {chickenList.length > 0 ? (chickenList.map( (chicken) => (
                      <div className="col s12 m6 l4" key={chicken.id}>
                    <div className="card">
                    <div className="card-image">
                        <img className="responsive-img"height="280" src={chicken.photo} alt=""/>
                    </div>
                    <div className="card-content">
                            <h6><b>{chicken.name}</b></h6>
                        {chicken.shop.name}

                        
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

                 <div className="col s12 m12 l12">    
                                
                    <h4><b>Recommended Chicken</b></h4>
                    <div className="row">
                    {recList.length > 0 ? (recList.map( (chicken) => (
                      <div className="col s12 m6 l4" key={chicken.id}>
                    <div className="card">
                    <div className="card-image">
                        <img className="responsive-img"height="280" src={chicken.photo} alt=""/>
                    </div>
                    <div className="card-content">
                            <h6><b>{chicken.name}</b></h6>
                        {chicken.shop.name}

                        
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

             </div>

         </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chickens: state.chickens,
        username : state.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChicken: () => dispatch(actions.fetchChicken())
    }
}
// export default SerachBrand;
export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
