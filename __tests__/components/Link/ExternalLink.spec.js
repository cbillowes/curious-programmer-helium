import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import ExternalLink from "../../../src/components/Link/ExternalLink"

describe("an external link component", () => {
  it("should render", () => {
    const component = <ExternalLink to="http://www.google.com/">Google</ExternalLink>
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render contents", () => {
    const component = mount(<ExternalLink to="http://www.google.com/">Google</ExternalLink>)
    expect(component.html()).toEqual(`<a href="http://www.google.com/" class="" target="_blank" rel="nofollow noopener noreferrer ">Google</a>`)
  })

  it("should render link with class name", () => {
    const component = mount(<ExternalLink className="galaxy-swirl" to="http://www.google.com/">Google</ExternalLink>)
    expect(component.html()).toEqual(`<a href="http://www.google.com/" class="galaxy-swirl" target="_blank" rel="nofollow noopener noreferrer ">Google</a>`)
  })

  it("should render link with url rel", () => {
    const component = mount(<ExternalLink rel="license" to="http://www.google.com/">Google</ExternalLink>)
    expect(component.html()).toEqual(`<a href="http://www.google.com/" class="" target="_blank" rel="nofollow noopener noreferrer license">Google</a>`)
  })
})