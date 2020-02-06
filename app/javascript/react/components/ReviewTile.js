import React, { useState } from "react"
import EditReviewForm from "./EditReviewForm"

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
    <div className="medium-10 large-4 card-section center">
      <div className="review-padding callout">
        <h4 className="font-size" id="review-rating">Rating: {rating}</h4>
        <p className="review-side-space" id="review-body">{body}</p>
        <p className="font-size" id="username">Posted by: {username}</p>
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

export default ReviewTile
