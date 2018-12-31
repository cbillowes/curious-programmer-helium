import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Share from "../../../src/components/Share/Facebook"

describe("a facebook share component", () => {

  it("should render", () => {
    const element = <Share url="https://bit.ly/blog/this-is-a-post" description="Just a little write up." size="52" />
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render its contents" , () => {
    const element = <Share url="https://bit.ly/blog/this-is-a-post" description="Just a little write up." size="52" />
    const component = mount(element)

    expect(component.html()).toContain(`SocialMediaShareButton--facebook`)
    expect(component.html()).toContain(`width="52" height="52"`)
    expect(component.html()).toContain(`social-icon--facebook`)
  })
})