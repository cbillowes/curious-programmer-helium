import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import SocialLinks from "../../../src/components/Footer/SocialLinks"
import data from "../../../data/SocialLinks"

describe("a footer social links component", () => {
  let element = <SocialLinks />
  let component
  
  beforeAll(() => {
    component = mount(element)
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render container", () => {
    expect(component.find(".social-links-footer").length).toEqual(1)
  })

  it("should render copyright content", () => {
    data.footer.map(item => {
      expect(component.html()).toContain(item.name.toLowerCase())
      expect(component.html()).toContain(`href="${item.href}"`)
    })
  })
})