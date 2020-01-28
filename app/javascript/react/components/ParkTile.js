import React, { useState, useEffect } from "react"

const ParkTile = props => {

  return (
    <div>
      <h2>
        {props.name}
        {props.city}
        {props.state}
        {props.zip}
        {props.rating}
      </h2>
      <img src={props.photo}/>
    </div>
  )
}

export default ParkTile
