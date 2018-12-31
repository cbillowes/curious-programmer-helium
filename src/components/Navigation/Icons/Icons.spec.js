import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Icons from "./Icons"

describe("an icon component", () => {
  let element = <Icons
    onMenuClick={{ active: true, toggle: () => { } }}
    onSearchClick={{ active: true, toggle: () => { } }} />
  let component

  beforeAll(() => {
    component = mount(element)
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })
})