import React from "react"

import VoteTile from "./VoteTile"

const ReviewTile = props => {

  return (
    <div className="row center">
      <h4 id="review-rating">Rating: {props.rating}</h4>
      <p id="body">{props.body}</p>
      <VoteTile
        votes={props.votes}
      />
    </div>
  )
}

export default ReviewTile;
