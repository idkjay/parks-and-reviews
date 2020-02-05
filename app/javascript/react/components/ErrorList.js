import React from 'react'
import _ from 'lodash'

const ErrorList = (props) => {
  const errorFields = Object.keys(props.errors)
  if (errorFields.length > 0) {

    let num = 0
    const listItems = errorFields.map(field => {
      num++
      return(
        <li key={num}>
          {_.capitalize(field)} {props.errors[field]}
        </li>
      )
    })
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    )
  } else {
    return ""
  }
}

export default ErrorList;
