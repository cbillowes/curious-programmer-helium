import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import url from "url-join"
import Page from "../src/pages/privacy-policy"
import config from "../data/SiteConfig"
import metadata from "./data/metadata"

describe("the privacy policy page", () => {
  describe("meta data", () => {
    mount(<Page />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML
    metadata.expect({
      title: "Privacy Policy",
      slug: "/privacy-policy",
      description: "This blog collects some personal data from its users. It is important to know what and how it is used.",
      image: url(config.siteUrl, config.defaultOgImage)
    }, helmet, schema)
  })

  describe("content", () => {
    it("expected", () => {
      const component = mount(<Page />)
      expect(component.html()).toContain(`id="overview"`)
      expect(component.html()).toContain(`id="types-of-data"`)
      expect(component.html()).toContain(`id="mode-and-place-of-processing-data"`)
      expect(component.html()).toContain(`id="purposes-of-processing"`)
      expect(component.html()).toContain(`id="detailed-information"`)
      expect(component.html()).toContain(`id="rights-of-users"`)
      expect(component.html()).toContain(`id="additional-information"`)
    })
  })
})