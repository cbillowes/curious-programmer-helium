import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import url from "url-join"
import Page from "../src/pages/archives"
import config from "../data/SiteConfig"
import metadata from "./data/metadata"

describe("the archives page", () => {

  let posts = {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            timeToRead: "20 min",
            fields: {
              slug: "hello-world"
            },
            frontmatter: {
              title: "Hello World",
              date: new Date()
            }
          }
        },
        {
          node: {
            timeToRead: "10 min",
            fields: {
              slug: "hello-galaxy"
            },
            frontmatter: {
              title: "Hello Galaxy",
              date: new Date()
            }
          }
        }
      ]
    }
  }

  describe("meta data", () => {
    mount(<Page data={posts} />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML
    metadata.expect({
      title: "Archives",
      slug: "/archives",
      description: config.siteDescription,
      image: url(config.siteUrl, config.defaultOgImage)
    }, helmet, schema)
  })

  describe("content", () => {
    it("expected", () => {
      const component = mount(<Page data={posts} />)
      expect(component.html()).toContain(`<li value="2" class="item" keywords="Hello,World"><a href="/hello-world">Hello World</a>`)
      expect(component.html()).toContain(`<li value="1" class="item" keywords="Hello,Galaxy"><a href="/hello-galaxy">Hello Galaxy</a>`)
    })
  })
})