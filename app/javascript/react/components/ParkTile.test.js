import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import ParkTile from "./ParkTile"
import { BrowserRouter } from "react-router-dom"

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
    expect(wrapper.find('h2').text()).toBe("Fake Tinker Falls")
  })

  it("should render an h3 element containing the park city, state, zip, and rating received via props", () => {
    expect(wrapper.find("#city").text()).toBe("Fake Tully")
  })

  it("should render an h3 element containing the park state received via props", () => {
    expect(wrapper.find("#state").text()).toBe("Fake New York")
  })

  it("should render an h3 element containing the park zip code received via props", () => {
    expect(wrapper.find("#zip").text()).toBe("fake 131593")
  })

  it("should render an h3 element containing the park rating received via props", () => {
    expect(wrapper.find("#rating").text()).toBe("5")
  })

  it("should render an img tag with the specific props", () => {
    expect(wrapper.find("img").props()).toEqual({
      src: "http://fakeurl.com/park"
    })
  })
})