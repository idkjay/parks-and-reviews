import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"

import ParkShow from "./ParkShow"
import ReviewTile from "./ReviewTile"
import ReviewForm from "./ReviewForm"

const ParksShowContainer = props => {
  const [ parkInfo, setParkInfo ] = useState({})
  const [ reviews, setReviews ] = useState([])
  const [ newReview, setNewReview ] = useState({
    rating: "",
    body: ""
  })
  const [ errors, setErrors ] = useState("")

  let parkId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/parks/${parkId}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(response => {
      setParkInfo(response.park)
      setReviews(response.park.reviews)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

    const addNewReview = (formPayload) => {
      fetch(`/api/v1/parks/${parkId}/reviews`, {
        credentials: 'same-origin',
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formPayload)
      })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
          throw error
        }
      })
      .then(response => response.json())
      .then(response => {
        if (response.review) {
          setReviews([...reviews, response.review])
        } else {
          setErrors(response.errors)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    const reviewTiles = reviews.map((review) => {
      return(
        <ReviewTile
          key={review.id}
          id={review.id}
          rating={review.rating}
          body={review.body}
          userId={review.user_id}
          parkId={review.park_id}
          votes={review.votes}
        />
      )
    })

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["rating", "body"]
    requiredFields.forEach((field) => {
      if (newReview[field].trim() === "") {
        submitErrors = {
          ...submitErrors, [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validSubmission()) {
      addNewReview(newReview)
      clearForm()
    }
  }

  const clearForm = (event) => {
    setNewReview({
      rating: "",
      body: ""
    })
  }

  return(
    <div>
      <ParkShow
        key={parkInfo.id}
        id={parkInfo.id}
        name={parkInfo.name}
        city= {parkInfo.city}
        state={parkInfo.state}
        zip={parkInfo.zip}
        rating={parkInfo.rating}
        description={parkInfo.description}
        photo={parkInfo.photo}
        addNewReview={addNewReview}
      />
      <ReviewForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        newReview={newReview}
        errors={errors}
        clearForm={clearForm}
      />
      {reviewTiles}
    </div>
  )
}

export default ParksShowContainer;
