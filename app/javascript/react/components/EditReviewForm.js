import React, { useState } from "react"
import _ from "lodash"

const EditReviewForm = (props) => {
  let className = "hidden"
  const [ editedReview, setEditedReview ] = useState({
    id: props.id,
    rating: props.rating,
    body: props.body
  })

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
      <form onSubmit={handleEditSubmit}>
        Edit your review:
        <label>
          Rating:
          <input
            onChange={handleEditInputChange}
            type="text"
            id="rating"
            value={editedReview.rating}
          />
        </label>

        <label>
          Review:
          <textarea
            onChange={handleEditInputChange}
            id="body"
            value={editedReview.body}
          />
        </label>

        <input id = "edit-submit" type="submit" value="Update"/>
      </form>
    </div>
  )
}

export default EditReviewForm;