import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Tags from "../../../src/components/Tag/Tags"
const _ = require("lodash")

describe("tags component", () => {
  it("should render", () => {
    const tags = []
    for (let i = 0; i < 5000; i++) {
      tags.push(`tag ${i}`)
    }
    const component = <Tags tags={tags} />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render contents", () => {
    const tags = ["technical", "information technology", "clojure", "Privacy Policy"]
    const component = mount(<Tags tags={tags} />)
    tags.map(tag => {
      expect(component.html()).toContain(`<a class="tag" href="/tags/${_.kebabCase(tag.toLowerCase())}">${tag}</a>`)
    })
  })
})