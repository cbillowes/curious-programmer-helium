import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import Page from "../src/pages/about"
import TimelineItem from "../src/components/About/TimelineItem"
import TimelineLegend from "../src/components/About/TimelineLegend"
import config from "../data/SiteConfig"

describe("the about page", () => {
  describe("it fully rendered", () => {
    it("should have its page title", () => {
      const component = mount(<Page />)
      const helmet = Helmet.peek()
      expect(helmet.title).toEqual(`About | ${config.siteTitle}`)
    })

    it("should have the bio", () => {
      const component = mount(<Page />)
      expect(component.html()).toContain(`class="about"`)
      expect(component.html()).toContain(`class="profile"`)
      expect(component.html()).toContain(`class="profile"`)
      expect(component.html()).toContain(`class="photo"`)
    })

    it("should show technologies", () => {
      const component = mount(<Page />)
      expect(component.html()).toContain(`class="technologies"`)
      expect(component.html()).toContain(`class="tag"`)
      expect(component.html()).toContain(`class="elaborate "`)
      expect(component.html()).toContain(`class="button"`)
    })

    it("should display the timeline", () => {
      const component = mount(<Page />)
      expect(component.html()).toContain(`class="timeline"`)
      expect(component.html()).toContain(`class="legend"`)
      expect(component.html()).toContain(`class="items"`)
    })
  })

  describe("timeline item", () => {
    it("should render the type", () => {
      const type = "random"
      const component = mount(<TimelineItem type={type} />)
      expect(component.html()).toContain(`class="item ${type}"`)
    })

    it("should render external company link", () => {
      const name = "Curious Programmer"
      const link = "https://curiousprogrammer.io"
      const component = mount(<TimelineItem company={name} companyLink={link} />)
      expect(component.html()).toContain(`<h2><a href="${link}" class="" target="_blank" rel="nofollow noopener noreferrer ">${name}</a></h2>`)
    })

    it("should render internal company link", () => {
      const name = "Curious Programmer"
      const link = "/about"
      const component = mount(<TimelineItem company={name} companyLink={link} />)
      expect(component.html()).toContain(`<h2><a href="${link}">${name}</a></h2>`)
    })

    it("should render a normal heading", () => {
      const name = "Curious Programmer"
      const component = mount(<TimelineItem company={name} />)
      expect(component.html()).toContain(`<h2>${name}</h2>`)
    })
  })

  describe("timeline", () => {
    it("should render all categories", () => {
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