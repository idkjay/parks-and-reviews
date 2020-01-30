
import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'


import App from '../react/components/App'
import RedBox from 'redbox-react'

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')
  
  if (reactElement) {
    ReactDOM.render(
      <App />,
      reactElement
    );
  }
});
