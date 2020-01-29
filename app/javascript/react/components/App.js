import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"

import ParksIndexContainer from "./ParksIndexContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ParksIndexContainer}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App
