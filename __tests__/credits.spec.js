import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import url from "url-join"
import Page from "../src/pages/credits"
import config from "../data/SiteConfig"
import metadata from "./data/metadata"

describe("the credits page", () => {

  describe("meta data", () => {
    mount(<Page />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML
    metadata.expect({
      title: "Credits",
      slug: "/credits",
      description: "Get an idea of the tech and resources I use to make this site look and act the way it does.",
      image: url(config.siteUrl, config.defaultOgImage)
    }, helmet, schema)
  })

  describe("content", () => {
    it("expected", () => {
      const component = mount(<Page />)
      expect(component.html()).toContain(`<div class="credits-container container">`)
      expect(component.html()).toContain(`<h1>Hosting</h1>`)
      expect(component.html()).toContain(`<h1>Continuous Integration</h1>`)
      expect(component.html()).toContain(`<h1>Code</h1>`)
      expect(component.html()).toContain(`<h1>Icons</h1>`)
      expect(component.html()).toContain(`<h1>Photography</h1>`)
      expect(component.html()).toContain(`<h1>Tools</h1>`)
      expect(component.html()).toContain(`<h1>Privacy Policy</h1>`)
    })
  })
})