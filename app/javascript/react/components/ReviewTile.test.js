import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import ReviewTile from "./ReviewTile"
import { BrowserRouter } from "react-router-dom"

describe("ReviewTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ReviewTile
          body= "This is a fake review"
          rating= "1"
        />
      </BrowserRouter>
    )
  })

  it("should render an h1 element containing the rating", () => {
    expect(wrapper.find("#review-rating").text()).toBe("Rating: 1")
  })

  it("should render an p element containg the review text", () => {
    expect(wrapper.find("#body").text()).toBe("This is a fake review")
  })
})
