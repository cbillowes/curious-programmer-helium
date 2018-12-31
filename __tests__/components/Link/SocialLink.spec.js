import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import SocialLink from "../../../src/components/Link/SocialLink"

describe("a social link component", () => {
  it("should render", () => {
    const component = <SocialLink />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render contents", () => {
    const component = mount(<SocialLink name="GitHub" icon="github" href="https://github.com/cbillowes" />)
    expect(component.html()).toContain(`<span class="github" title="GitHub"><a href="https://github.com/cbillowes"`)
  })
})