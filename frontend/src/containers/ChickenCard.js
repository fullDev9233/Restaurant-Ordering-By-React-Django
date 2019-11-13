import React from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings';


class ChickenCard extends React.Component{
    state = {
        rating: 0,
    }
    changeRating = ( newRating, name ) => {
        this.setState({
            rating: newRating

        })
    }
    render(){
        const { chickens = [] } = this.props.data
        console.log(chickens)
        return(
            <div>
                {chickens.map( chicken => (
                    <div>

                    {chicken.name}
                    </div>
                ))}
            </div>
        )

    }
}

export default ChickenCard;