import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Compact from "../../../src/components/PostNavigation/Compact"
import Elaborate from "../../../src/components/PostNavigation/Elaborate"

describe("post navigation components", () => {
  const previous = { slug: "/blog/world", title: "World", cover: "world.jpg", excerpt: "<p>World</p>", tags: ["world"] }
  const next = { slug: "/blog/galaxy", title: "galaxy", cover: "galaxy.jpg", excerpt: "<p>Galaxy</p>", tags: ["galaxy"] }

  describe("an elaborate component", () => {
    const element = <Elaborate previous={previous} next={next} />

    it("should render", () => {
      const tree = renderer.create(element).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("should contain to nav post items", () => {
      const component = mount(element)
      expect(component.find(".nav.previous .post").length).toEqual(1)
      expect(component.find(".nav.next .post").length).toEqual(1)
    })

    it("should have posts with backgrounds", () => {
      const component = mount(element)
      expect(component.find(".nav.previous .post").html()).toContain(`class="post" style="background-image: url(${previous.cover});">`)
      expect(component.find(".nav.next .post").html()).toContain(`class="post" style="background-image: url(${next.cover});">`)
    })

    it("should have posts with titles", () => {
      const component = mount(element)
      expect(component.find(".nav.previous .post").html()).toContain(`<h1>${previous.title}</h1>`)
      expect(component.find(".nav.next .post").html()).toContain(`<h1>${next.title}</h1>`)
    })

    it("should have posts with excerpts", () => {
      const component = mount(element)
      expect(component.find(".nav.previous .post").html()).toContain(`<p>${previous.excerpt}</p>`)
      expect(component.find(".nav.next .post").html()).toContain(`<p>${next.excerpt}</p>`)
    })

    it("should have posts with metadata", () => {
      const component = mount(element)
      expect(component.find(".nav.previous .post").html()).toContain(`<a class="tag" href="/tags/${previous.tags[0]}">${previous.tags[0]}</a>`)
      expect(component.find(".nav.next .post").html()).toContain(`<a class="tag" href="/tags/${next.tags[0]}">${next.tags[0]}</a>`)
    })
  })

  describe("a compact component", () => {
    const element = <Compact previous={previous} next={next} />

    it("should render", () => {
      const tree = renderer.create(element).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("should contain to nav items", () => {
      const component = mount(element)
      expect(component.html()).toContain(`<div class="post-navigation compact">`)
      expect(component.html()).toContain(`<a class="previous" href="${previous.slug}">${previous.title}</a>`)
      expect(component.html()).toContain(`<a class="next" href="${next.slug}">${next.title}</a>`)
    })
  })
})