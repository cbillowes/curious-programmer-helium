import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Helmet from "react-helmet"
import AboutPage from "../../src/pages/about"
import config from "../../data/SiteConfig"

describe("an about page", () => {
  it("should render", () => {
    const component = <AboutPage />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the meta data title", () => {
    const component = mount(<AboutPage />)
    const helmet = Helmet.peek()
    expect(helmet.title).toEqual(`About | ${config.siteTitle}`)
  })

  it("should render children tags", () => {
    const component = mount(<AboutPage />)
    expect(component.find(".about-container").html()).toBeDefined()
  })
})