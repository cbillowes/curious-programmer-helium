import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Helmet from "react-helmet"
import CreditsPage from "../../src/pages/credits"
import config from "../../data/SiteConfig"

describe("a credits page", () => {
  it("should render", () => {
    const component = <CreditsPage />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the meta data title", () => {
    const component = mount(<CreditsPage />)
    const helmet = Helmet.peek()
    expect(helmet.title).toEqual(`Credits | ${config.siteTitle}`)
  })

  it("should render children tags", () => {
    const component = mount(<CreditsPage />)
    expect(component.find(".credits-container").html()).toBeDefined()
  })
})