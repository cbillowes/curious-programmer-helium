import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import Page from "../src/pages/privacy-policy"
import config from "../data/SiteConfig"

describe("the privacy policy page", () => {
  it("should have its page title", () => {
    const component = mount(<Page />)
    const helmet = Helmet.peek()
    expect(helmet.title).toEqual(`Privacy Policy | ${config.siteTitle}`)
  })

  it("should render the necessary content", () => {
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