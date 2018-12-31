import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Contact from "../../../src/components/About/Contact"

describe("technologies component", () => {
  it("should render", () => {
    const component = <Contact />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render contents", () => {
    const component = mount(<Contact />)
  })
})