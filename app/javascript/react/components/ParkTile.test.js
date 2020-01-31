import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"

Enzyme.configure({ adapter: new Adapter() })

import ParkTile from "./ParkTile"

describe("ParkTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ParkTile
          photo="http://fakeurl.com/park"
          name="Fake Tinker Falls"
          city="Fake Tully"
          state="Fake New York"
          zip="fake 131593"
          rating="5"
        />
      </BrowserRouter>
    )
  })

  it("should render an h2 element containing the park name received via props", () => {
    expect(wrapper.find("#name").text()).toBe("Fake Tinker Falls")
  })

  it("should render an h3 element containing the park city, state, zip, and rating received via props", () => {
    expect(wrapper.find("#location").text()).toBe("Fake Tully, Fake New York")
  })

  it("should render an h3 element containing the park rating received via props", () => {
    expect(wrapper.find("#rating").text()).toBe("5 stars")
  })

  it("should render an img tag with the specific props", () => {
    expect(wrapper.find("img").props()["src"]).toEqual("http://fakeurl.com/park")
  })
})
