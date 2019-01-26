import React from "react"
import Helmet from "react-helmet"
import { mount, render } from "enzyme"
import moment from "moment"
import Path from "path"
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
      image: url(config.siteUrl, context.slug, data.post.frontmatter.cover)
    }, helmet, schema)

    describe("check out those metadata image urls", () => {
      it("prefers the og:image over any other specified image", () => {
        let slug = "/2019-01-01/this-is-a-really-awesome-post"
        let newData = data
        let newContext = context
        newData.post.frontmatter.ogImage = "/images/og-image.png"
        newData.post.frontmatter.cover = "cover.png"
        newContext.slug = slug

        mount(<Page pageContext={newContext} data={newData} />)
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(`${config.siteUrl}/images/og-image.png`, newHelmet, newSchema)
      })

      it("falls back to the cover image when the og:image is not set", () => {
        let slug = "/2019-01-01/this-is-a-really-awesome-post"
        let newData = data
        let newContext = context
        newData.post.frontmatter.ogImage = ""
        newData.post.frontmatter.cover = "cover.png"
        newContext.slug = slug

        mount(<Page pageContext={newContext} data={newData} />)
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(`${config.siteUrl}${slug}/cover.png`, newHelmet, newSchema)
      })

      it("it uses the default site og:image when neither og:image nor cover image is set", () => {
        let slug = "/2019-01-01/this-is-a-really-awesome-post"
        let newData = data
        let newContext = context
        newData.post.frontmatter.ogImage = ""
        newData.post.frontmatter.cover = ""
        newContext.slug = slug

        mount(<Page pageContext={newContext} data={newData} />)
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(config.siteUrl + Path.resolve("/", config.defaultOgImage), newHelmet, newSchema)
      })

      it("defaults to site logo when all else fails", () => {
        let slug = "/2019-01-01/this-is-a-really-awesome-post"
        let newData = data
        let newContext = context
        config.defaultOgImage = ""
        newContext.slug = slug

        mount(<Page pageContext={newContext} data={newData} />)
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(config.siteUrl + Path.resolve("/", config.siteLogo), newHelmet, newSchema)
      })
    })

    describe("the absolute image urls", () => {
      it("that are relative to a folder", () => {
        let newContext = context
        let newData = data
        newData.post.fields.slug = ""
        newData.post.frontmatter.cover = "background.png"
        newContext.slug = "/path/to/some/or/other/post"

        mount(<Page pageContext={newContext} data={newData} />)
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(`${config.siteUrl}/path/to/some/or/other/post/background.png`, newHelmet, newSchema)
      })

      it("that are just relative to a path", () => {
        let newContext = context
        let newData = data
        newData.post.fields.slug = ""
        newData.post.frontmatter.cover = "../../../background.png"
        newContext.slug = "/path/to/some/or/other/post"

        mount(<Page pageContext={newContext} data={newData} />)
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage(`${config.siteUrl}/path/to/some/background.png`, newHelmet, newSchema)
      })

      it("that are external urls", () => {
        let newContext = context
        let newData = data
        newData.post.frontmatter.cover = "https://picsum.photos/#/54654"

        mount(<Page pageContext={newContext} data={newData} />)
        const newHelmet = Helmet.peek()
        const newSchema = newHelmet.scriptTags[newHelmet.scriptTags.length - 1].innerHTML
        metadata.expectImage("https://picsum.photos/#/54654", newHelmet, newSchema)
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
      data.post.fields.date = new Date(2018, 11, 31)
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(`${moment("2018-12-31").format("ddd, DD MMMM YYYY")}`)
    })

    it("should say it was posted today", () => {
      data.post.fields.date = new Date()
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(">Today</time>")
    })

    it("should say it was posted yesterday", () => {
      let date = new Date()
      date = date.setDate(date.getDate() - 1)
      data.post.fields.date = date
      const component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(">Yesterday</time>")
    })

    it("should say it was posted something ago", () => {
      let date = new Date()
      date = date.setDate(date.getDate() - (365 * 3))
      data.post.fields.date = date
      let component = mount(<Page pageContext={context} data={data} />)
      expect(component.html()).toContain(">3 years ago</time>")
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

    describe("should be able to navigate to previous and next posts", () => {
      it("has a navigation bar at the top of the post", () => {
        const component = render(<Page pageContext={context} data={data} />)
        expect(component.find(".compact").find(".previous").length).toEqual(1)
        expect(component.find(".compact").find(".next").length).toEqual(1)
      })

      it("has a navigation bar at the bottom of the post", () => {
        const component = render(<Page pageContext={context} data={data} />)
        expect(component.find(".elaborate").find(".previous").length).toEqual(1)
        expect(component.find(".elaborate").find(".next").length).toEqual(1)
      })

      it("can navigate to the previous post", () => {
        const component = render(<Page pageContext={context} data={data} />)
        const previous = `<a class="previous" href="/path/to/previous/post"><span class="title">Previous post</span></a>`
        const next = `<a class="next" href="/path/to/next/post"><span class="title">Next post</span></a>`
        expect(component.find(".compact").html()).toContain(previous)
        expect(component.find(".compact").html()).toContain(next)
      })

      it("can navigate to the next post", () => {
        const component = render(<Page pageContext={context} data={data} />)
        const previous = `<h1>Previous post</h1>`
        const next = `<h1>Next post</h1>`
        expect(component.find(".elaborate").html()).toContain(previous)
        expect(component.find(".elaborate").html()).toContain(next)
      })
    })
  })
})
