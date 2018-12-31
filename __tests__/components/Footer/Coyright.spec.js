import $ from "jquery"
import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Copyright from "../../../src/components/Footer/Copyright"
import config from "../../../data/SiteConfig"

describe("a copyright component", () => {
  let element = <Copyright />
  let component
  
  beforeAll(() => {
    component = mount(element)
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render container", () => {
    expect(component.find(".copyright-footer").length).toEqual(1)
  })

  it("should render copyright content", () => {
    let footerText = `Made with Gatsby v2 and other <a href="/credits">cool stuff</a>.`
    let expected = `Copyright © ${new Date().getFullYear()} ${config.siteTitle}. ${footerText}`
    expect(component.html()).toContain(expected)
  })
})