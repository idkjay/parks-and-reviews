import React from "react"

const ReviewTile = props => {
  const { id, rating, body, userId, parkId, deleteReview } = props

  const handleDelete = () => {
    deleteReview(id)
  }

  return (
    <div className="row" align="center">
      <h4 id="review-rating">Rating: {rating}</h4>
      <p id="body">{body}</p>
      <input type="button" onClick={handleDelete} value="Delete Review" />
    </div>
  )
}

export default ReviewTile
