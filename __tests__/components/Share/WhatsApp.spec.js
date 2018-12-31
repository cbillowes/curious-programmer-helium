import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Share from "../../../src/components/Share/WhatsApp"

describe("a whatsapp share component", () => {
  const size = 30
  const element = <Share url="https://bt.ly/blog/this-is-a-post" title="Just is a blog post" size={size} />
    
  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render its contents" , () => {
    const component = mount(element)
    expect(component.html()).toContain(`SocialMediaShareButton--whatsapp`)
    expect(component.html()).toContain(`width="${size}" height="${size}"`)
    expect(component.html()).toContain(`social-icon--whatsapp`)
  })
})