import React from "react"

import ParkShowContainer from "./ParkShowContainer"

const ReviewTile = props => {

  return (
    <div className="row" align="center">
      <h4 id="review-rating">Rating: {props.rating}</h4>
      <p id="body">{props.body}</p>
    </div>
  )
}

export default ReviewTile
