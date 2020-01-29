import React from "react"

const ParkTile = props => {
  return (
    <div className="row" align="center">
      <div className="columns small-10">
        <div className="image-wrapper overlay-fade-in">
          <img className="photo" src={props.photo}/>
            <div className="image-overlay-content">
              <h2 id="name">{props.name}</h2>
              <p id="location">{props.city}, {props.state}</p>
              <p id="rating">{props.rating} stars</p>
            </div>
        </div>
      </div>
    </div>
  )
}
export default ParkTile
