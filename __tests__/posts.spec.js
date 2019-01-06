import React from "react"
import Helmet from "react-helmet"
import { mount } from "enzyme"
import moment from "moment"
import Page from "../src/templates/post"
import metadata from "./data/metadata"
import url from "url-join"
import config from "../data/SiteConfig"
import data from "./data/post"
const context = {
  slug: data.post.fields.slug
}

describe("the posts page", () => {
  const component = mount(<Page pageContext={context} data={data} />)
  const helmet = Helmet.peek()
  const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML

  describe("page metadata", () => {
    metadata.expect({
      title: data.post.frontmatter.title,
      description: data.post.excerpt,
      slug: context.slug,
      image: data.post.frontmatter.cover
    }, helmet, schema)

    describe("different types of image urls", () => {
      it("in folder", () => {
        let newContext = context
        let newData = data
        newData.post.fields.slug = ""
        newData.post.frontmatter.cover = "background.png"
        newContext.slug = "/path/to/some/or/other/post"

        mount(<Page pageContext={newContext} data={newData} />)
        const slug = newContext.slug
        const cover = newData.post.frontmatter.cover
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(cover, slug, newHelmet, newSchema)
        expect(metadata.getImage(cover, slug)).toEqual(url(config.siteUrl, slug, cover))
      })

      it("relative path", () => {
        let newContext = context
        let newData = data
        newData.post.fields.slug = ""
        newData.post.frontmatter.cover = "../../../background.png"
        newContext.slug = "/path/to/some/or/other/post"

        mount(<Page pageContext={newContext} data={newData} />)
        const slug = newContext.slug
        const cover = newData.post.frontmatter.cover
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(cover, slug, newHelmet, newSchema)
        expect(metadata.getImage(cover, slug)).toEqual(url(config.siteUrl, "/path/to/some/background.png"))
      })

      it("absolute url", () => {
        let newContext = context
        let newData = data
        newData.post.frontmatter.cover = "https://picsum.photos/#/54654"

        mount(<Page pageContext={newContext} data={newData} />)
        const slug = newContext.slug
        const cover = newData.post.frontmatter.cover
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(cover, slug, newHelmet, newSchema)
        expect(metadata.getImage(cover, slug)).toEqual(cover)
      })
    })
  })

  describe("page contents", () => {
    it("should have a post cover", () => {
      data.post.frontmatter.cover = "background.png"

      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`class="cover default background"`)
      expect(component.html()).toContain(`style="background-image: url(${data.post.frontmatter.cover});"`)
      expect(component.html()).toContain(`class="post with-cover"`)
    })

    it("should have a blur post cover", () => {
      data.post.frontmatter.blur = "background.png"

      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`class="cover blur background"`)
      expect(component.html()).toContain(`style="background-image: url(${data.post.frontmatter.blur});"`)
      expect(component.html()).toContain(`class="post with-cover"`)
    })

    it("should have no backgrounds", () => {
      data.post.frontmatter.cover = ""
      data.post.frontmatter.blur = ""

      const component = mount(<Page pageContext={context} data={data} />)
      const background = component.html().indexOf(`class="cover blur background`)
      const blur = component.html().indexOf(`class="cover blur background`)
      const cover = component.html().indexOf(`class="post width-cover"`)
      expect(component.html()).toContain(`class="post "`)
      expect(background).toEqual(-1)
      expect(blur).toEqual(-1)
      expect(cover).toEqual(-1)
    })

    it("should have post navigation", () => {
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`class="post-navigation compact"`)
      expect(component.html()).toContain(`class="post-navigation elaborate"`)
    })

    it("should have post metadata", () => {
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`class="post-metadata"`)
    })

    it("should date time stamp", () => {
      data.post.fields.date = new Date(2018,11,31)
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`${moment("2018-12-31").format("ddd, DD MMMM YYYY")}`)
    })

    it("should have est. reading time", () => {
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`(Est. ${data.post.timeToRead} minute read)`)
    })

    it("should have tags", () => {
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`class="tags"`)
    })

    it("should have social links", () => {
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`class="social-media"`)
    })

    it("should have disqus", () => {
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`id="disqus_thread"`)
    })
  })
})