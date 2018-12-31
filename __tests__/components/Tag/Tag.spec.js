import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Tag from "../../../src/components/Tag/Tag"

describe("a tag component", () => {
  it("should render", () => {
    const component = <Tag />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render contents", () => {
    const component = mount(<Tag to="/privacy-policy">Privacy Policy</Tag>)
    expect(component.html()).toEqual(`<a class="tag" href="/privacy-policy">Privacy Policy</a>`)
  })

  it("should render linkless", () => {
    const component = mount(<Tag>Privacy Policy</Tag>)
    expect(component.html()).toEqual(`<span class="tag">Privacy Policy</span>`)
  })
})