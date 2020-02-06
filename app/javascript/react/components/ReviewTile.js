import React from "react"
import EditReviewForm from "./EditReviewForm"

import VoteTile from "./VoteTile"

const ReviewTile = props => {
  const { id, rating, body, userId, parkId, username, currentUsername, deleteReview, updateReview } = props
  let className = "hidden"

  const handleDelete = () => {
    deleteReview(id)
  }

  if(currentUsername === username) {
    className = "visible"
  }

  return (
    <div className="row center">
      <h4 id="review-rating">Rating: {rating}</h4>
      <p id="review-body">{body}</p>
      <p id="username">Posted by: {username}</p>
      <input className={className} type="button" onClick={handleDelete} value="Delete Review" />
      <VoteTile
        votes={props.votes}
      />
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
  )
}

export default ReviewTile;
