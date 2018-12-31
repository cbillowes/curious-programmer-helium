import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Navigation from "./Navigation"

describe("a navigation component", () => {
  let element = <Navigation />
  let component
  
  beforeAll(() => {
    component = mount(element)    
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })
})