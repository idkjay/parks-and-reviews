import React, { useState, useEffect } from "react"
import EditReviewForm from "./EditReviewForm"
import VoteTile from "./VoteTile"

const ReviewTile = props => {
  const [ votes, setVotes ] = useState(props.votes)
  const { id, rating, body, userId, parkId, username, currentUsername, deleteReview, updateReview } = props
  let className = "hidden"

  const handleDelete = () => {
    deleteReview(id)
  }

  if(currentUsername === username) {
    className = "visible"
  }

  const handleVoteClick = (voteInfo) => {
    fetch(`/api/v1/parks/${parkId}/reviews/${id}/votes`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(voteInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      setVotes(body.votes)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="medium-10 large-4 card-section center">
      <div className="review-padding callout">
        <div className="inline">
          <p className="top-review" id="username">@{username} - </p>
          <p className="top-review" id="review-rating">Rating: {rating}/5</p>
      </div>
        <VoteTile
          votes={votes}
          handleVoteClick={handleVoteClick}
        />
      <p className="review-side-space callout" id="review-body">{body}</p>
        <input className={className} type="button" onClick={handleDelete} value="Delete Review" />
        <EditReviewForm
          body={body}
          rating={rating}
          updateReview={updateReview}
          id={id}
          className={className}
          username={username}
          currentUsername={currentUsername}
        />
      </div>
    </div>
  )
}

export default ReviewTile;
