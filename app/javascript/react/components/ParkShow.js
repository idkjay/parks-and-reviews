import React, { useState } from "react"

const ParkShow = ({ parkInfo, stateAverage }) => {
  let { id, name, state, zip, rating, description, photo, average } = parkInfo

  return(
    <div>
      <h1 className="center" id="name">{name}</h1>
      <div className="grid-container">
        <div className="grid-x">
          <div className="center">
            <img className="image cell small-10 large-7" src={photo} id="photo"/>
              <div className="review-margin review-info-box">
                <h4 className="cell small-10 large-5" id="location">{state}</h4>
                <h4 className="cell small-10 large-5" id="park-rating">{stateAverage}</h4>
                <br />
                <p className="cell small-10 large-5" id="description">{description}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkShow;
