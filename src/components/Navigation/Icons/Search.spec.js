import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Search from "./Search"

describe("a search icon component", () => {
  let element = <Search toggle={() => console.log("toggle")} active="true" />
  let component
  
  beforeAll(() => {
    component = mount(element)    
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })
})