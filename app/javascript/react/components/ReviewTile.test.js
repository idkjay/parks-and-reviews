import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import ReviewTile from "./ReviewTile"
import { BrowserRouter } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

describe("ReviewTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ReviewTile
          key={1}
          id={1}
          body="This is a fake review"
          rating="1"
          userId={1}
          parkId={1}
          username="Ben"
          currentUsername="Ben"
          votes={[2]}
        />
      </BrowserRouter>
    )
  })

  it("should render an h4 element containing the rating", () => {
    expect(wrapper.find("#review-rating").text()).toBe("Rating: 1")
  })

  it("should render an p element containing the review text", () => {
    expect(wrapper.find("#review-body").text()).toBe("This is a fake review")
  })
})
