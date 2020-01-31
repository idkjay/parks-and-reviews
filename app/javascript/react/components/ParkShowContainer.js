import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'

import ParkShow from "./ParkShow"
import ReviewTile from "./ReviewTile"

const ParksShowContainer = props => {
  const [ parkInfo, setParkInfo ] = useState({})
  const [ reviews, setReviews ] = useState([])

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
        setReviews([...reviews, response])
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    useEffect(() => {
      fetch(`/api/v1/parks/${parkId}/reviews`)
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
      .then(reviewData => {
        setReviews(reviewData.reviews)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }, [])



    let parkReturn

    if (parkInfo) {
      parkReturn = <ParkShow
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
    }

    const reviewTiles = reviews.map((review) => {
      return(
        <ReviewTile
          key={review.id}
          rating={review.rating}
          body={review.body}
          userId={review.user_id}
          parkId={review.park_id}
          />
      )
    })

  return(
    <div>
      {parkReturn}
      {reviewTiles}
    </div>
  )
}

export default ParksShowContainer;
