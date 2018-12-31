import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Footer from "../../../src/components/Footer/Footer"

describe("a footer component", () => {
  it("should render", () => {
    const component = <Footer />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render container", () => {
    const component = mount(<Footer />)
    expect(component.find(".footer").length).toEqual(1)
  })

  it("should render container", () => {
    const component = mount(<Footer />)
    expect(component.find(".footer").length).toEqual(1)
  })
})