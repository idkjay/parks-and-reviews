import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import ParksIndexContainer from "./ParksIndexContainer"
import { BrowserRouter } from "react-router-dom"

describe("ParkTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <ParkTile
        photo="http://fakeurl.com/park"
        name="Fake Tinker Falls"
        city="Fake Tully"
        state="Fake New York"
        zip="fake 131593"
      />

    )
  })



})
