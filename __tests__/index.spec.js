import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import url from "url-join"
import Page from "../src/pages/index"
import config from "../data/SiteConfig"
import metadata from "./data/metadata"

describe("the index page", () => {

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
      title: "Blog",
      slug: "/",
      description: `${config.siteDescription} I write about what I learn, then share it.`,
      image: url(config.siteUrl, config.defaultOgImage)
    }, helmet, schema)
  })

  describe("content", () => {
    it("expected", () => {
      const component = mount(<Page data={posts} />)
      expect(component.html()).toContain(`<section><a href="hello-world"><h1>Hello World</h1></a>`)
      expect(component.html()).toContain(`<section><a href="hello-galaxy"><h1>Hello Galaxy</h1></a>`)
    })
  })
})