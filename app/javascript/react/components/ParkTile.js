import React from "react"
import { Link } from "react-router-dom"

import ParkShowContainer from "./ParkShowContainer"

const ParkTile = ({ parkData }) => {
  let { id, name, state, photo, average } = parkData

  return (
    <div className="row" align="center">
      <div className="columns small-10">
        <div>
          <div className="image-wrapper overlay-fade-in">
            <Link to={`/parks/${id}`}>
              <img className="photo" src={photo}/>
                <div className="image-overlay-content">
                  <h2 id="name">{name}</h2>
                  <p id="location">{state}</p>
                  <p id="average">{average}</p>
                </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkTile;
