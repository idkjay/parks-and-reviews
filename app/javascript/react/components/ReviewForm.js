import React, { useState } from "react"
import ErrorList from "./ErrorList"
import _ from "lodash"

const ratings = [1, 2, 3, 4, 5]

const ReviewForm = ({ handleSubmit, handleInputChange, clearForm, newReview, errors }) => {

  const ratingOptions = ratings.map((rating) => <option key={rating} value={rating}>{rating}</option>)

  return(
    <div className="review-form callout">
      <h3 className="review-form-title">Add New Review</h3>
      <form id="review-form" onSubmit={handleSubmit} >
        <ErrorList errors={errors}/>
        <label>
          Rating:
          <select className="rating-field" onChange={handleInputChange} id="rating" value={newReview.rating}>{ratingOptions}</select>
        </label>

        <label>
          Review:
          <textarea onChange={handleInputChange} id="body" value={newReview.body}/>
        </label>

        <input id="submit" type="submit" />
        <br />
        <input type="button" onClick={clearForm} value="Clear" />
      </form>
    </div>
  )
}

export default ReviewForm;
