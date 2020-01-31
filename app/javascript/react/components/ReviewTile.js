import React from "react"

import ParkShowContainer from "./ParkShowContainer"

const ReviewTile = props => {

  return (
    <div className="row" align="center">
      <h1>{props.rating}</h1>
      <p>{props.body}</p>
    </div>
  )
}

export default ReviewTile
