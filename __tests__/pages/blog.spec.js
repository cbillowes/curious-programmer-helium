import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Helmet from "react-helmet"
import BlogPage from "../../src/pages/blog"
import config from "../../data/SiteConfig"

describe("a credits page", () => {
    const data = {
      allMarkdownRemark: {
        edges: [{
          node: {
            fields: {},
            frontmatter: {}
          }
        }]
      }
    }

  it("should render", () => {
    const component = <BlogPage data={data} />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the meta data title", () => {
    const component = mount(<BlogPage data={data} />)
    const helmet = Helmet.peek()
    expect(helmet.title).toEqual(`Blog | ${config.siteTitle}`)
  })

  it("should render children tags", () => {
    const component = mount(<BlogPage data={data} />)
    expect(component.find(".blog-container").html()).toBeDefined()
  })
})