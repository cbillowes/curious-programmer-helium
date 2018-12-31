import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import PostListing from "../../../src/components/PostListing/PostListing"

const postEdges = {
  edges: [{
    node: {
      excerpt: "My first simple write up.",
      timeToRead: 20,
      fields: {
        slug: "/blog/getting-started-with-datomic-part-1",
        date: new Date()
      },
      frontmatter: {
        tags: ["technical", "clojure", "datomic"],
        title: "Getting started with Datomic part 1",
        cover: "https://picsum.photos/#/157"
      }
    }
  },
  {
    node: {
      excerpt: "My second simple write up.",
      timeToRead: 20,
      fields: {
        slug: "/blog/getting-started-with-datomic",
        date: new Date()
      },
      frontmatter: {
        tags: ["technical", "clojure", "datomic"],
        title: "Getting started with Datomic part 2",
        cover: "https://picsum.photos/#/564"
      }
    }
  }, {
    node: {
      excerpt: "A duplicate post.",
      timeToRead: 20,
      fields: {
        slug: "/blog/getting-started-with-datomic-part-2",
        date: new Date()
      },
      frontmatter: {
        tags: ["technical", "clojure", "datomic"],
        title: "Getting started with Datomic part 2",
        cover: "https://picsum.photos/#/564"
      }
    }
  }]
}

describe("a post listing component", () => {
  it("should render", () => {
    const element = <PostListing postEdges={postEdges.edges} />
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render container", () => {
    const component = mount(<PostListing postEdges={postEdges.edges} />)
    expect(component.find(".posts").length).toEqual(1)
  })

  it("should render all attributes", () => {
    const component = mount(<PostListing postEdges={postEdges.edges} />)
    postEdges.edges.map(edge => {
      expect(component.html()).toContain(`<p>${edge.node.excerpt}</p>`)
      expect(component.html()).toContain(`<h1>${edge.node.frontmatter.title}</h1>`)
      edge.node.frontmatter.tags.map(tag => {
        expect(component.html()).toContain(`>${tag}</`)
      })
      expect(component.html()).toContain(`<a href="${edge.node.fields.slug}"`)
      expect(component.html()).toContain(`a few seconds ago</time>`)
    })
  })

  it("should render all posts", () => {
    let duplicatedEdges = { edges: [] }
    for (let i = 0; i < 4; i++) {
      duplicatedEdges.edges.push({
        node: {
          fields: {
            slug: "/blog/getting-started-with-datomic/" + i
          },
          frontmatter: {}
        }
      })
    }
    const component = mount(<PostListing postEdges={duplicatedEdges.edges} />)
    expect(component.find("a").length).toEqual(duplicatedEdges.edges.length)
  })
})