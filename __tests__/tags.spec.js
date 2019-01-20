import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import url from "url-join"
import Page from "../src/pages/tags"
import config from "../data/SiteConfig"
import metadata from "./data/metadata"

describe("the tags page", () => {
  describe("metadata", () => {
    let posts = {
      allMarkdownRemark: {edges:[]}
    }
    mount(<Page data={posts} />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML
    metadata.expect({
      title: "Tags",
      slug: "/tags",
      description: "From Fedora to Datomic to Communication to Cheat Sheets and more. Get content by tags.",
      image: url(config.siteUrl, config.defaultOgImage)
    }, helmet, schema)
  })

  describe("content", () => {
    let posts = {
      allMarkdownRemark: {
        edges: [{
          node: {
            frontmatter: {
              tags: ["Technical", "CLI", "Git"]
            }
          }
        }, {
          node: {
            frontmatter: {
              tags: ["Technical", "Linux", "Linux", "Cheat Sheet"]
            }
          }
        }
        ]
      }
    }

    it("should not contain duplicates", () => {
      const component = mount(<Page data={posts} />)
      expect(component.getDOMNode().getElementsByClassName("tag").length).toEqual(5)
    })
  })
})