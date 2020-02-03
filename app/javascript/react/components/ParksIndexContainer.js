import React, { useState, useEffect } from "react"

import ParkTile from "./ParkTile"

const ParksIndexContainer = props => {
  const [ getPark, setPark ] = useState([])

  useEffect(() => {
    fetch("/api/v1/parks.json")
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
    .then(body => {
      setPark(body.parks)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const parkTiles = getPark.map(park => {
    return(
      <ParkTile
        key={park.id}
        id={park.id}
        name={park.name}
        city={park.city}
        state={park.state}
        zip={park.zip}
        rating={park.rating}
        photo={park.photo}
      />
    )
  })

  return (
    <div>
      <h3 class = "index-title">Explore Our National Parks</h3>
      {parkTiles}
    </div>
  )
}

export default ParksIndexContainer
