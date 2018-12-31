import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Logo from "./Logo"

describe("a logo component", () => {
  let element = <Logo />
  let component
  
  beforeAll(() => {
    component = mount(element)
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render the logo", () => {
    expect(component.find(".logo")).toBeTruthy()
    expect(component.html()).toContain(`href="/"`)
    expect(component.html()).toContain(`{ <span class="normal-weight">curious</span> programmer }`)
  })

  it("should render the mobile logo", () => {
    expect(component.find(".mobile-logo")).toBeTruthy()
    expect(component.html()).toContain(`{ }`)
  })
})