import React from "react"

const ParkTile = props => {

  return (
    <div>
      <h2>{props.name}</h2>
      <h3 id="city">{props.city}</h3>
      <h3 id="state">{props.state}</h3>
      <h3 id="zip">{props.zip}</h3>
      <h3 id="rating">{props.rating}</h3>
      <img src={props.photo}/>
    </div>
  )
}

export default ParkTile
