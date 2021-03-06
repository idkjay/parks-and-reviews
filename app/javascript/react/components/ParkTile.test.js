import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"

Enzyme.configure({ adapter: new Adapter() })

import ParkTile from "./ParkTile"

describe("ParkTile", () => {
  let wrapper
  let parkData

  beforeEach(() => {
    parkData = {
      photo: "http://fakeurl.com/park",
      name: "Fake Tinker Falls",
      state: "Fake New York",
      average: "2"
    }
    wrapper = mount(
      <BrowserRouter>
        <ParkTile
          parkData={parkData}
        />
      </BrowserRouter>
    )
  })

  it("should render an h2 element containing the park name received via props", () => {
    expect(wrapper.find("#name").text()).toBe("Fake Tinker Falls")
  })

  it("should render an h3 element containing the park state received via props", () => {
    expect(wrapper.find("#location").text()).toBe("Fake New York")
  })

  it("should render an img tag with the specific props", () => {
    expect(wrapper.find("img").props()["src"]).toEqual("http://fakeurl.com/park")
  })

  it("should render an p element containing the park average rating", () => {
    expect(wrapper.find("#average").text()).toBe("2")
  })
})
