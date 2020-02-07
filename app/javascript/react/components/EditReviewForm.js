import React, { useState } from "react"
import _ from "lodash"

const ratings = ["", 1, 2, 3, 4, 5]

const EditReviewForm = (props) => {
  let className = "hidden"
  const [ editedReview, setEditedReview ] = useState({
    id: props.id,
    rating: props.rating,
    body: props.body
  })

  const ratingOptions = ratings.map((rating) => <option key={rating} value={rating}>{rating}</option>)

  const handleEditSubmit = (event) => {
    event.preventDefault()
    props.updateReview(editedReview)
  }

  const handleEditInputChange = (event) => {
    setEditedReview({
      ...editedReview,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  if(props.currentUsername === props.username) {
    className = "visible"
  }

  return(
    <div className={className}>
      <form className="padding" onSubmit={handleEditSubmit}>
        <div className="edit-review">
          Edit your review
        </div>
        <label className="edit-review">
          Rating:
          <select className="rating-field" onChange={handleEditInputChange} id="rating" value={editedReview.rating} placeholder={props.rating}> {ratingOptions}</select>
        </label>

        <label>
          Review:
          <textarea onChange={handleEditInputChange} id="body" value={editedReview.body} placeholder={props.body}/>
        </label>

        <input id="edit-submit" type="submit" value="Update Review"/>
      </form>
    </div>
  )
}

export default EditReviewForm;
