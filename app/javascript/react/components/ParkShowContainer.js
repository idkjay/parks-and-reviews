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
  const [ getAverage, setAverage ] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)

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
      setAverage(response.park.average)
      setParkInfo(response.park)
      setReviews(response.park.reviews)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  let parkId = props.match.params.id

  const deleteReview = (reviewId) => {
    fetch(`/api/v1/parks/${parkId}/reviews/${reviewId}`, {
      credentials: 'same-origin',
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setReviews(response.reviews)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const updateReview = (editedReview) => {
    fetch(`/api/v1/parks/${parkId}/reviews/${editedReview.id}`, {
      credentials: 'same-origin',
      method: "PATCH",
      body: JSON.stringify(editedReview),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setReviews(response.reviews)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }


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
          setAverage(response.review.park.average)
        } else {
          setErrors(response.errors)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

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

  const reviewTiles = reviews.map((review) => {
    return(
      <ReviewTile
        key={review.id}
        id={review.id}
        rating={review.rating}
        body={review.body}
        userId={review.user_id}
        parkId={review.park_id}
        username={review.username}
        currentUsername={review.current_username}
        deleteReview={deleteReview}
        updateReview={updateReview}
        votes={review.votes}
      />
    )
  })

  return(
    <div>
      <ParkShow
        parkInfo={parkInfo}
        addNewReview={addNewReview}
        stateAverage={getAverage}
      />
      <ReviewForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        newReview={newReview}
        errors={errors}
        clearForm={clearForm}
       />
      <h1 className="padding center">Reviews</h1>
      <div className="grid-x flex">
        {reviewTiles}
      </div>
    </div>
  )
 }

export default ParksShowContainer;
