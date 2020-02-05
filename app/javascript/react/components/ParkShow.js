import React, { useState } from "react"

const ParkShow = ({ parkInfo, stateAverage }) => {
  let { id, name, state, zip, rating, description, photo, average } = parkInfo

  return(
    <div>
      <img src={photo} id="photo"/>
      <h1 id="name">{name}</h1>
      <h3 id="location">{state}</h3>
      <h3 id="average">{stateAverage}</h3>
      <p id="description">{description}</p>
    </div>
  )
}

export default ParkShow;
