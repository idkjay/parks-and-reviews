import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"

import ParksIndexContainer from "./ParksIndexContainer"
import ParkShowContainer from "./ParkShowContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ParksIndexContainer}/>
        <Route exact path="/parks" component={ParksIndexContainer}/>
        <Route exact path="/parks/:id" component={ParkShowContainer}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App
