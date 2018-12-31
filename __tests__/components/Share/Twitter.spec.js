import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Share from "../../../src/components/Share/Twitter"

describe("a twitter share component", () => {
  const element = <Share url="https://bit.ly/blog/this-is-a-post" title="This is a blog post" size="52" />

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render its contents", () => {
    const component = mount(element)
    expect(component.html()).toContain(`SocialMediaShareButton--twitter`)
    expect(component.html()).toContain(`width="52" height="52"`)
    expect(component.html()).toContain(`social-icon--twitter`)
  })
})