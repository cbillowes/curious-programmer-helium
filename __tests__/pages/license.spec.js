import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Helmet from "react-helmet"
import LicensePage from "../../src/pages/license"
import config from "../../data/SiteConfig"

describe("a license page", () => {
  it("should render", () => {
    const component = <LicensePage />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the meta data title", () => {
    const component = mount(<LicensePage />)
    const helmet = Helmet.peek()
    expect(helmet.title).toEqual(`License | ${config.siteTitle}`)
  })

  it("should render children tags", () => {
    const component = mount(<LicensePage />)
    expect(component.find(".license-container").html()).toBeDefined()
  })
})