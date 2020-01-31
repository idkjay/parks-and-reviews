import React, { useState } from "react"

const ParkShow = props => {
  const [newReview, setNewReview] = useState({
    rating: "",
    body: ""
  })

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNewReview(newReview)
  }

  return(
    <div>
      <img src={props.photo} id="photo"/>
      <h1 id="name">{props.name}</h1>
      <h3 id="location">{props.city}, {props.state} {props.zip}</h3>
      <h3 id="rating">Rating: {props.rating}</h3>
      <p id="description">{props.description}</p>


      <form onSubmit={handleSubmit} action={`/parks/${props.id}/reviews`} method="post">
        <label>
          Rating:
          <input onChange={handleInputChange} type="text" id="rating" value={newReview.rating}/>
        </label>

        <label>
          Review:
          <textarea onChange={handleInputChange} id="body" value={newReview.body}/>
        </label>

        <input type="submit" />
      </form>
    </div>
  )
}

export default ParkShow;
