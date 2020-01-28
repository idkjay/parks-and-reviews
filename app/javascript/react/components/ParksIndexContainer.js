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
      let park = body
      setPark(park)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const parkTiles = getPark.map(park => {
    const id = park.id
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
      <h1>Park List</h1>
      {parkTiles}
    </div>
  )
}

export default ParksIndexContainer
