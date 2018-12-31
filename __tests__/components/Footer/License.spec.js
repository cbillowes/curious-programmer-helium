import React from "react"
import renderer from "react-test-renderer"
import License from "../../../src/components/Footer/License"

describe("a license component", () => {
  it("should render", () => {
    let element = <License />
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })
})