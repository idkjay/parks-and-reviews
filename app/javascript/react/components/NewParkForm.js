import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import _ from "lodash"
import ErrorList from "./ErrorList"

const NewParkForm = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [ newPark, setNewPark ] = useState({
    name: "",
    city: "",
    state: "",
    zip: "",
    rating: "",
    photo: ""
  })
  const [ errors, setErrors ] = useState({})

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
        return response;
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error);
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

  const clearForm = event => {
    setNewPark({
      name: "",
      city: "",
      state: "",
      zip: "",
      rating: "",
      photo: ""
    })
  }

  return (
    <div>
      <h2>New Park Form</h2>
      <form onSubmit={handleSubmit} className="new-name-form callout">
        <ErrorList
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
          <textarea
            type="city"
            name="city"
            id="city"
            value={newPark.city}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="state">
          Park State:
          <textarea
            type="state"
            name="state"
            id="state"
            value={newPark.state}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="zip">
          Park Zip:
          <textarea
            type="zip"
            name="zip"
            id="zip"
            value={newPark.zip}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="rating">
          Park Rating:
          <textarea
            type="rating"
            name="rating"
            id="rating"
            value={newPark.rating}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="photo">
          Park Image URL:
          <textarea
            type="photo"
            name="photo"
            id="photo"
            value={newPark.photo}
            onChange={handleChange}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
          <button
            className="button"
            onClick={clearForm}>Clear
          </button>
        </div>

      </form>
    </div>
  )
}

export default NewParkForm
