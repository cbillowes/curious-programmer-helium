import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Searchbar from "./Searchbar"

describe("a search bar component", () => {
  let element = <Searchbar toggle={() => {}} active="true" />
  let component
  
  beforeAll(() => {
    component = mount(element)    
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })
})