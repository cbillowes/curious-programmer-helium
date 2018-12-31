import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Timeline from "../../../src/components/About/Timeline"
import TimelineLegend from "../../../src/components/About/TimelineLegend"
import TimelineItem from "../../../src/components/About/TimelineItem"

describe("timeline components", () => {
  it("should render timeline", () => {
    const tree = renderer.create(<Timeline />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe("with a timeline item", () => {
    it("should render", () => {
      const tree = renderer.create(<TimelineItem />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("should generate the type of item", () => {
      const type = "arbitrary-type"
      const component = mount(<TimelineItem type={type} />)
      expect(component.html()).toContain(`class="item ${type}`)
    })

    it("should get an external company link in company heading", () => {
      const company = "Jameson's Industries"
      const companyLink = "https://www.jame.son"
      const component = mount(<TimelineItem company={company} companyLink={companyLink} />)
      expect(component.html()).toContain(`<h2><a href="${companyLink}" class="" target="_blank" rel="nofollow noopener noreferrer ">${company}</a></h2>`)
    })

    it("should get an internal company link in company heading", () => {
      const company = "Jameson's Industries"
      const companyLink = "/jamesons"
      const component = mount(<TimelineItem company={company} companyLink={companyLink} />)
      expect(component.html()).toContain(`<h2><a href="${companyLink}">${company}</a></h2>`)
    })

    it("should get no link in company heading", () => {
      const company = "Jameson's Industries"
      const companyLink = "/jamesons"
      const component = mount(<TimelineItem company={company} />)
      expect(component.html()).toContain(`<h2>${company}</h2>`)
    })
  })

  describe("with a timeline legend", () => {
    const active = {
      education: false,
      work: false,
      podcasts: false,
      publishing: false,
      talks: false,
      blogs: false,
      projects: false,
      community: false
    }
    
    it("should render", () => {
      const tree = renderer.create(<TimelineLegend active={active} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
    
    it("should generate the legend", () => {
      const component = mount(<TimelineLegend active={active} />)
      expect(component.html()).toContain(`<li title="Education"`)
      expect(component.html()).toContain(`<li title="Work"`)
      expect(component.html()).toContain(`<li title="Podcasts"`)
      expect(component.html()).toContain(`<li title="Publishing"`)
      expect(component.html()).toContain(`<li title="Talks"`)
      expect(component.html()).toContain(`<li title="Blogs"`)
      expect(component.html()).toContain(`<li title="Projects"`)
      expect(component.html()).toContain(`<li title="Community"`)
    })
  })
})