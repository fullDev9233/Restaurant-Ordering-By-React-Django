import React ,{Component} from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'

class MyPage extends Component{
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        const chickenList = this.props.chickens.slice(0,3)
        return (
         <div className="container">
             <div className="row">
                <div className="col s12 m12 l12">
                    <h4><b>Recommended Chicken</b></h4>

                    <div className="row">
                    {chickenList.length > 0 ? (chickenList.map( (chicken) => (
                      <div className="col s12 m6 l4" key={chicken.id}>
                    <div className="card">
                    <div className="card-image">
                        <img className="responsive-img"height="280" src="images/cimage.jpg" alt=""/>
                    </div>
                    <div className="card-content">
                            <h6><b>{chicken.brand}</b></h6>
                        {chicken.name}

                        
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

                 <div className="col s12 m12 l12">                   
                    <h4><b>My Favorite Chicken</b></h4>
                    <div className="row">
                    {chickenList.length > 0 ? (chickenList.map( (chicken) => (
                      <div className="col s12 m6 l4" key={chicken.id}>
                    <div className="card">
                    <div className="card-image">
                        <img className="responsive-img"height="280" src="images/cimage.jpg" alt=""/>
                    </div>
                    <div className="card-content">
                            <h6><b>{chicken.brand}</b></h6>
                        {chicken.name}

                        
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
