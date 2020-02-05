import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import ParkShow from "./ParkShow"
import { BrowserRouter } from "react-router-dom"

describe("ParkShow", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ParkShow
          photo="http://fakeurl.com/park"
          name="Fake Tinker Falls"
          state="Fake New York"
          description="This is fake"
          rating="5"
        />
      </BrowserRouter>
    )
  })

  it("should render an h1 element containing the park name received via props", () => {
    expect(wrapper.find("#name").text()).toBe("Fake Tinker Falls")
  })

  it("should render an h3 element containing the park state received via props", () => {
    expect(wrapper.find("#location").text()).toBe("Fake New York")
  })

  it("should render an h3 element containing the park rating received via props", () => {
    expect(wrapper.find("#park-rating").text()).toBe("Rating: 5")
  })

  it("should render an p element containing the park description received via props", () => {
    expect(wrapper.find("#description").text()).toBe("This is fake")
  })

  it("should render an img tag with the specific props", () => {
    expect(wrapper.find("img").props()["src"]).toEqual("http://fakeurl.com/park")
  })
})
