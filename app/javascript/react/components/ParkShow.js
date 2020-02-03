import React, { useState } from "react"

const ParkShow = props => {
  return(
    <div>
      <img src={props.photo} id="photo"/>
      <h1 id="name">{props.name}</h1>
      <h3 id="location">{props.city}, {props.state} {props.zip}</h3>
      <h3 id="park-rating">Rating: {props.rating}</h3>
      <p id="description">{props.description}</p>
    </div>
  )
}

export default ParkShow;
