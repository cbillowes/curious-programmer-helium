import React from "react"
import renderer from "react-test-renderer"
import CloudAfrica from "../../../src/components/About/Companies/CloudAfrica"
import DStv from "../../../src/components/About/Companies/DStv"
import Remata from "../../../src/components/About/Companies/Remata"
import ITEM from "../../../src/components/About/Companies/ITEM"
import Globres from "../../../src/components/About/Companies/Globres"
import Education from "../../../src/components/About/Companies/Education"

describe("companies component", () => {
  it("should render CloudAfrica", () => {
    const tree = renderer.create(<CloudAfrica />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("should render DStv", () => {
    const tree = renderer.create(<DStv />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("should render Remata", () => {
    const tree = renderer.create(<Remata />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("should render ITEM", () => {
    const tree = renderer.create(<ITEM />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("should render Globres", () => {
    const tree = renderer.create(<Globres />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("should render Education", () => {
    const tree = renderer.create(<Education />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})