import React, { useState } from "react"
import _ from "lodash"

const EditReviewForm = (props) => {
  let className = "hidden"
  const [ editedReview, setEditedReview ] = useState({
    id: props.id,
    rating: "",
    body: ""
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
      <form className="padding" onSubmit={handleEditSubmit}>
        <div className="font-size">
          Edit your review:
        </div>
        <label>
          Rating:
          <input className="edit-rating" onChange={handleEditInputChange} type="text" id="rating" value={editedReview.rating} placeholder={props.rating} />
        </label>

        <label>
          Review:
          <textarea className="edit-form-padding" onChange={handleEditInputChange} id="body" value={editedReview.body} placeholder={props.body}/>
        </label>

        <input id = "edit-submit" type="submit" value="Update Review"/>
      </form>
    </div>
  )
}

export default EditReviewForm;
