import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import NewParkErrorList from "./NewParkErrorList"

const NewParkForm = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})
  const [newPark, setNewPark] = useState({
    name: "",
    city: "",
    state: "",
    zip: "",
    rating: "",
    photo: ""
  })

  const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

  const stateOptions = states.map((state) => <option key={state} value={state}>{state}</option>)

  const addNewPark = () => {
    fetch("/api/v1/parks", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(newPark),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response =>  response.json())
    .then(response => {
      setNewPark(response)
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`)
  )}

  if (shouldRedirect) {
    return <Redirect to='/parks' />
  }

  const handleChange = event => {
    setNewPark({
      ...newPark,
      [event.currentTarget.name]:
      event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(validForSubmission()) {
      addNewPark()
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "city", "state", "zip", "rating", "photo"]
    requiredFields.forEach(field => {
      if (newPark[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  return (
    <div className="grid-container">
      <form onSubmit={handleSubmit} className="new-name-form callout">
        <h2 className="park-form-title">New Park Form</h2>

        <NewParkErrorList
          errors={errors}
        />

      <label htmlFor="name">
        Park Name:
          <input
            type="text"
            name="name"
            id="name"
            value={newPark.name}
            onChange={handleChange}
          />
      </label>

        <label htmlFor="city">
          Park City:
          <input
            type="text"
            name="city"
            id="city"
            value={newPark.city}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="state">
          Park State:
          <select value={newPark.state} type="state" name="state" id="state" onChange={handleChange}>
            <option></option>
            {stateOptions}
          </select>
        </label>

        <label htmlFor="zip">
          Park Zip:
          <input
            type="text"
            name="zip"
            id="zip"
            value={newPark.zip}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="photo">
          Park Image URL:
          <input
            type="text"
            name="photo"
            id="photo"
            value={newPark.photo}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="rating">
          Park Rating:
          <input
            type="text"
            name="rating"
            id="rating"
            value={newPark.rating}
            onChange={handleChange}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>

      </form>
    </div>
  )
}

export default NewParkForm
