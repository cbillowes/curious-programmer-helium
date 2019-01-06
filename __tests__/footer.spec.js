import React from "react"
import { mount } from "enzyme"
import Footer from "../src/components/Footer/Footer"
import config from "../data/SiteConfig"
import data from "../data/SocialLinks"

describe("the footer component", () => {
  let component

  beforeAll(() => {
    component = mount(<Footer />)  
  })

  it("should render the component", () => {
    const component = mount(<Footer />)
    expect(component.html()).toContain(`class="footer"`)
  })

  it("should render the copyright", () => {
    let footerText = `Made with Gatsby v2 and other <a href="/credits">cool stuff</a>.`
    let expected = `Copyright © ${new Date().getFullYear()} ${config.siteTitle}. ${footerText}`
    expect(component.html()).toContain(expected)
  })

  it("should render social links", () => {

    data.footer.map(item => {
      expect(component.html()).toContain(item.name.toLowerCase())
      expect(component.html()).toContain(`href="${item.href}"`)
    })
  })
})