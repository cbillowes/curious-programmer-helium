import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Menu from "./Menu"

describe("a menu icon component", () => {
  let element = <Menu toggle={() => console.log("toggle")} active="true" />
  let component
  
  beforeAll(() => {
    component = mount(element)    
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })
})