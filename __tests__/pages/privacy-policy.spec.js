import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Helmet from "react-helmet"
import PrivacyPolicyPage from "../../src/pages/privacy-policy"
import config from "../../data/SiteConfig"

describe("a license page", () => {
  it("should render", () => {
    const component = <PrivacyPolicyPage />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the meta data title", () => {
    const component = mount(<PrivacyPolicyPage />)
    const helmet = Helmet.peek()
    expect(helmet.title).toEqual(`Privacy Policy | ${config.siteTitle}`)
  })

  it("should render children tags", () => {
    const component = mount(<PrivacyPolicyPage />)
    expect(component.find(".privacy-policy-container").html()).toBeDefined()
  })
})