import React, { useEffect, useState } from "react"

import VoteTile from "./VoteTile"

const ReviewTile = props => {
  // const [ getVotes, setVotes ] = useState({})

// debugger
  // useEffect(() => {
  //   fetch(`/api/v1/parks/${props.parkId}/reviews/${props.id}/votes`)
  //   .then(response => {
  //     if (response.ok) {
  //       return response
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`,
  //       error = new Error(errorMessage)
  //       throw error
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     setVotes(response[0])
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }, [])

  return (
    <div className="row" align="center">
      <h4 id="review-rating">Rating: {props.rating}</h4>
      <p id="body">{props.body}</p>
      <VoteTile
        votes={props.votes}
      />
    </div>
  )
}

export default ReviewTile;
