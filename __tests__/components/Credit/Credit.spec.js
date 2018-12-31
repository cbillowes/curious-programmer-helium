import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Credit from "../../../src/components/Credit/Credit"

describe("a credit component", () => {
  it("should render", () => {
    const component = <Credit />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // it("should render contents", () => {
  //   const component = mount(<Tag to="/privacy-policy">Privacy Policy</Tag>)
  //   expect(component.html()).toEqual(`<a class="tag" href="/privacy-policy">Privacy Policy</a>`)
  // })
})