import React from "react"
import { mount } from "enzyme"
import Metadata from "../src/components/Metadata/Post/Metadata"

describe("post metadata", () => {
  describe("estimated time to read", () => {
    it("should merge with given value", () => {
      const component = mount(<Metadata timeToRead="10" />)
      expect(component.html()).toContain("Est. 10 minute read")
    })

    it("hide text when value is not given", () => {
      const component = mount(<Metadata />)
      expect(component.html().indexOf("(Est.")).toEqual(-1)
      expect(component.html().indexOf("minute read)")).toEqual(-1)
    })
  })
})