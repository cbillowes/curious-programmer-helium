
import React from "react"
import renderer from "react-test-renderer"
import Copyright from "../../src/components/Footer/Copyright"
import Footer from "../../src/components/Footer/Footer"
import License from "../../src/components/Footer/License"
import SocialLinks from "../../src/components/Footer/SocialLinks"
import config from "../../data/SiteConfig"

describe("footer components", () => {
  describe("snapshots", () => {
    it("component", () => {
      const tree = renderer.create(<Footer />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("copyright", () => {
      const tree = renderer.create(<Copyright />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("license", () => {
      const tree = renderer.create(<License />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("social links", () => {
      const tree = renderer.create(<SocialLinks />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})