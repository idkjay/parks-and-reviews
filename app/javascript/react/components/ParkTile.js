import React from "react"
import { Link } from "react-router-dom"

import ParkShowContainer from "./ParkShowContainer"

const ParkTile = props => {

  return (
    <div className="row" align="center">
      <div className="columns small-10">
        <div>
          <div className="image-wrapper overlay-fade-in">
            <Link to={`/parks/${props.id}`}>
              <img className="photo" src={props.photo}/>
                <div className="image-overlay-content">
                  <h2 id="name">{props.name}</h2>
                  <p id="location">{props.city}, {props.state}</p>
                  <p id="rating">{props.rating} stars</p>
                </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkTile
