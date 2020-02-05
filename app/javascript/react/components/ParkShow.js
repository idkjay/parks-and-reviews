import React, { useState } from "react"

const ParkShow = props => {
  return(
    <div>
      <h1 className="center" id="name">{props.name}</h1>
      <hr/>
      <div className="grid-container">
        <div className="grid-x">
          <div className="center">
            <img className="image cell small-10 large-7" src={props.photo} id="photo"/>
              <div className="review-margin review-info-box">
                <h4 className="cell small-10 large-5" id="location">{props.state}</h4>
                <h4 className="cell small-10 large-5" id="park-rating">Rating: {props.rating}</h4>
                <br />
                <p className="cell small-10 large-5" id="description">{props.description}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkShow;
