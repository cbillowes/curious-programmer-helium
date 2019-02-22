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
              slug: "/hello-world"
            },
            frontmatter: {
              title: "Hello World",
              date: new Date(2018, 9, 30)
            }
          }
        },
        {
          node: {
            timeToRead: "10 min",
            fields: {
              slug: "/hello-galaxy"
            },
            frontmatter: {
              title: "Hello Galaxy",
              date: new Date(2018, 11, 29)
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
      description: `My blog. ${config.siteDescription} All posts dated back from 2016.`,
      image: url(config.siteUrl, config.defaultOgImage)
    }, helmet, schema)
  })

  describe("content", () => {
    it("expected", () => {
      const component = mount(<Page data={posts} />)
      const elements = component.getDOMNode().getElementsByClassName("item")

      expect(elements.length).toEqual(2)

      expect(elements[0].outerHTML).toContain(`<li value=\"2\" class=\"item\" keywords=\"Hello,World\"><a class=\"title\" href=\"/hello-world\">Hello World</a><div class=\"post-metadata\"><p><span>posted`)
      expect(elements[0].outerHTML).toContain(`30 October 2018</time></span></span> by Clarice Bouwer <span><span>(Est. 20 min minute read)</span></span></p><span></span></div></li>`)

      expect(elements[1].outerHTML).toContain(`<li value=\"1\" class=\"item\" keywords=\"Hello,Galaxy\"><a class=\"title\" href=\"/hello-galaxy\">Hello Galaxy</a><div class=\"post-metadata\"><p><span>posted`)
      expect(elements[1].outerHTML).toContain(`29 December 2018</time></span></span> by Clarice Bouwer <span><span>(Est. 10 min minute read)</span></span></p><span></span></div></li>`)
    })
  })
})
