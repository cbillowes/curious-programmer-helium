import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import BlogTemplate from "../../src/templates/post"

const prevPost = {
  markdownRemark: {
    fields: {
      slug: "/getting-started-with-datomic-part-1",
      date: new Date()
    },
    frontmatter: {
      tags: ["technical", "clojure", "datomic"],
      title: "Getting started with Datomic Part 1",
      cover: "https://picsum.photos/#/648"
    }
  }
}
const currentPost = {
  markdownRemark: {
    html: "",
    fields: {
      slug: "/getting-started-with-datomic",
      date: new Date()
    },
    frontmatter: {
      tags: ["technical", "clojure", "datomic"],
      title: "Getting started with Datomic Part 2",
      cover: "https://picsum.photos/#/157",
      blur: "https://picsum.photos/#157/blurred"
    }
  }
}
const nextPost = {
  markdownRemark: {
    fields: {
      slug: "/getting-started-with-datomic-part-3",
      date: new Date()
    },
    frontmatter: {
      tags: ["technical", "clojure", "datomic"],
      title: "Getting started with Datomic Part 3"
    }
  }
}

const pageContext = {
  slug: currentPost.markdownRemark.fields.slug,
  prev: prevPost.markdownRemark.fields.slug,
  next: nextPost.markdownRemark.fields.slug
}

const data = {
  prev: prevPost.markdownRemark,
  post: currentPost.markdownRemark,
  next: nextPost.markdownRemark
}

describe("a blog post template", () => {
  const element = <BlogTemplate pageContext={pageContext} data={data} />

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the cover image", () => {
    const component = mount(element)
    expect(component.html()).toContain(`class="cover default background" style="background-image: url(${currentPost.markdownRemark.frontmatter.cover});"`)
  })

  it("should generate the blur image", () => {
    const component = mount(element)
    expect(component.html()).toContain(`class="cover blur background" style="background-image: url(${currentPost.markdownRemark.frontmatter.blur});"`)
  })

  it("should use post image for background", () => {
    currentPost.markdownRemark.frontmatter.post = "";
    const component = mount(element)
    expect(component.html().indexOf(`class="cover default background" style="background-image: url(${currentPost.markdownRemark.frontmatter.post});"`)).toEqual(-1)
  })

  it("should skip the cover image", () => {
    currentPost.markdownRemark.frontmatter.cover = "";
    const component = mount(element)
    expect(component.html().indexOf(`style="background-image: url(${currentPost.markdownRemark.frontmatter.cover});"`)).toEqual(-1)
  })
})