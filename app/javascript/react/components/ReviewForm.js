import React from "react"
import ErrorList from "./ErrorList"
import _ from "lodash"

const ReviewForm = ({ handleSubmit, handleInputChange, clearForm, newReview, errors }) => {

  return(
    <form id="review-form" onSubmit={handleSubmit} >
      <ErrorList errors={errors}/>
      <label>
        Rating:
        <input onChange={handleInputChange} type="text" id="rating" value={newReview.rating}/>
      </label>

      <label>
        Review:
        <textarea onChange={handleInputChange} id="body" value={newReview.body}/>
      </label>

      <input id="submit" type="submit" />
      <input type="button" onClick={clearForm} value="Clear" />
    </form>
  )
}

export default ReviewForm;
