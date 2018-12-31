import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import About from "../../../src/components/About/About"

describe("an about component", () => {
  it("should render", () => {
    const component = <About />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render contents", () => {
    const component = mount(<About />)
    expect(component.find(".bio")).toBeDefined()
    expect(component.find(".profile")).toBeDefined()
  })
})