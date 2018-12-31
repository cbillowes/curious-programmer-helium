import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Share from "../../../src/components/Share/Share"

describe("a share component", () => {
  const element = <Share path="/blog/this-is-a-post" title="This is a blog post" description="A small write up." size="52" />

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render its contents", () => {
    const component = mount(element)
    expect(component.html()).toContain(`SocialMediaShareButton--facebook`)
    expect(component.html()).toContain(`SocialMediaShareButton--googlePlus`)
    expect(component.html()).toContain(`SocialMediaShareButton--linkedin`)
    expect(component.html()).toContain(`SocialMediaShareButton--reddit`)
    expect(component.html()).toContain(`SocialMediaShareButton--twitter`)
    expect(component.html()).toContain(`SocialMediaShareButton--telegram`)
  })
})