import React from "react"
import renderer from "react-test-renderer"
import TagTemplate from "../../src/templates/tag"

const data = {
  allMarkdownRemark: {
    edges: [{
      node: {
        excerpt: "A simple write up.",
        timeToRead: 20,
        fields: {
          slug: "tags/technical",
          date: new Date()
        },
        frontmatter: {
          tags: ["technical", "clojure", "datomic"],
          title: "Getting started with Datomic",
          cover: "https://picsum.photos/#/157"
        }
      }
    }]
  }
}
const pageContext = {
  tag: "technical"
}

describe("a tag template", () => {
  const element = <TagTemplate pageContext={pageContext} data={data} />

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should generate the meta data title", () => {
    // const component = mount(element)
    // const helmet = Helmet.peek()
    // expect(helmet.title).toEqual(`Technical | Tags | ${config.siteTitle}`)
  })

  it("should render children tags", () => {
    // const component = mount(element)
    // console.log(component.html())
    // expect(component.find(".tag-container").html()).toBeDefined()
    // expect(component.find("#posts").html()).toBeDefined()
  })
})