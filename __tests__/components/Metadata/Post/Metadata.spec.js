import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Metadata from "../../../../src/components/Metadata/Post/Metadata"

describe("a post metadata component", () => {
  it("should render", () => {
    const component = <Metadata />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render the attributes of the post written", () => {
    let date = new Date(2010, 0, 1)
    let component = mount(<Metadata date={date} />)
    expect(component.html()).toContain(`Fri, 1 January 2010`)

    date = new Date(2010, 0, 21)
    component = mount(<Metadata date={date} />)
    expect(component.html()).toContain(`Thu, 21 January 2010`)

    date = new Date()
    component = mount(<Metadata date={date} />) 
    expect(component.html()).toContain(`a few seconds ago</time>`)

    component = mount(<Metadata timeToRead={10} />) 
    expect(component.html()).toContain(`(Est. 10 minute read)`)

    component = mount(<Metadata tags={["technical"]} />) 
    expect(component.html()).toContain(`<ul class="tags">`)
  })
})