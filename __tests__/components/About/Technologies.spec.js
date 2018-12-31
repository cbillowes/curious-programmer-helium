import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Technologies from "../../../src/components/About/Technologies"

describe("technologies component", () => {
  it("should render", () => {
    const component = <Technologies />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render contents", () => {
    const component = mount(<Technologies />)
  })
})