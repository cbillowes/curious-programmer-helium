import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Helmet from "react-helmet"
import TagsPage from "../../src/pages/tags"
import config from "../../data/SiteConfig"

describe("a tags page", () => {
  it("should render", () => {
    const component = <TagsPage />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the meta data title", () => {
    const component = mount(<TagsPage />)
    const helmet = Helmet.peek()
    expect(helmet.title).toEqual(`Tags | ${config.siteTitle}`)
  })

  it("should render children tags", () => {
    const component = mount(<TagsPage />)
    expect(component.find(".tags-container").html()).toBeDefined()
  })
})