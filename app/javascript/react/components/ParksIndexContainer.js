import React, { useState, useEffect } from "react"
import ParkTile from "./ParkTile"
import NewParkForm from "./NewParkForm"

const ParksIndexContainer = props => {
  const [ parks, setParks ] = useState([])

  useEffect(() => {
    fetch("/api/v1/parks")
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
      setParks(body.parks)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const parkTiles = parks.map(park => {
    return(
      <div>
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
      </div>
    )
  })

  return (
    <div>
      <h3 className = "index-title">Explore Our National Parks</h3>
      {parkTiles}
    </div>
  )
}

export default ParksIndexContainer
