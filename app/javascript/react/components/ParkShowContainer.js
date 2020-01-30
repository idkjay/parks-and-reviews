import React, { useState, useEffect } from "react"

import ParkShow from "./ParkShow"

const ParksShowContainer = props => {
  const [ parkInfo, setParkInfo ] = useState({})

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

    let parkReturn

    if (parkInfo) {
      parkReturn = <ParkShow
        id={parkInfo.id}
        name={parkInfo.name}
        city= {parkInfo.city}
        state={parkInfo.state}
        zip={parkInfo.zip}
        rating={parkInfo.rating}
        description={parkInfo.description}
        photo={parkInfo.photo}
      />
    }

  return(
    <div>
      {parkReturn}
    </div>
  )
}

export default ParksShowContainer;
