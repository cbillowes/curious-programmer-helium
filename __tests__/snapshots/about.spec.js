import React from "react"
import renderer from "react-test-renderer"
import Page from "../../src/pages/about"
import About from "../../src/components/About/About"
import Contact from "../../src/components/About/Contact"
import CloudAfrica from "../../src/components/About/Companies/CloudAfrica"
import DStv from "../../src/components/About/Companies/DStv"
import Remata from "../../src/components/About/Companies/Remata"
import ITEM from "../../src/components/About/Companies/ITEM"
import Globres from "../../src/components/About/Companies/Globres"
import Education from "../../src/components/About/Companies/Education"
import Technologies from "../../src/components/About//Technologies";
import Timeline from "../../src/components/About/Timeline";
import TimelineLegend from "../../src/components/About/TimelineLegend";
import TimelineItem from "../../src/components/About/TimelineItem";

describe("about components", () => {
  describe("snapshots", () => {

    it("page", () => {
      const tree = renderer.create(<Page />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("container", () => {
      const tree = renderer.create(<About />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("contact", () => {
      const tree = renderer.create(<Contact />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("technologies", () => {
      const tree = renderer.create(<Technologies />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("timeline", () => {
      const tree = renderer.create(<Timeline />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("timeline item", () => {
      const tree = renderer.create(<TimelineItem />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("timeline legend", () => {
      const tree = renderer.create(<TimelineLegend active={{}} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    describe("career-related components", () => {
      it("CloudAfrica", () => {
        const tree = renderer.create(<CloudAfrica />).toJSON()
        expect(tree).toMatchSnapshot()
      })

      it("DStv", () => {
        const tree = renderer.create(<DStv />).toJSON()
        expect(tree).toMatchSnapshot()
      })

      it("Remata", () => {
        const tree = renderer.create(<Remata />).toJSON()
        expect(tree).toMatchSnapshot()
      })

      it("ITEM", () => {
        const tree = renderer.create(<ITEM />).toJSON()
        expect(tree).toMatchSnapshot()
      })

      it("Globres", () => {
        const tree = renderer.create(<Globres />).toJSON()
        expect(tree).toMatchSnapshot()
      })

      it("Education", () => {
        const tree = renderer.create(<Education />).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
  })
})