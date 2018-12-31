import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import License from "../../../src/components/License/License"

describe("a license component", () => {
  let element = <License />
  let component
  
  beforeAll(() => {
    component = mount(element)    
  })

  it("should render", () => {
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render container", () => {
    expect(component.find(".license").length).toEqual(1)
  })

  it("should render creative commons license image", () => {
    expect(component.html()).toContain(`<img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" title="Creative Commons Attribution-ShareAlike 4.0 International License">`)
  })

  it("should render terms property", () => {
    expect(component.html()).toContain(`<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title"> Curious Programmer content </span>`)
  })

  it("should render attribution url", () => {
    expect(component.html()).toContain(`<a href="https://curiousprogrammer.io" class="" target="_blank" rel="nofollow noopener noreferrer cc:attributionURL">Clarice Bouwer</a>`)
  })

  it("should render licensed under url", () => {
    expect(component.html()).toContain(`<a href="http://creativecommons.org/licenses/by-sa/4.0/" class="" target="_blank" rel="nofollow noopener noreferrer license">Creative Commons Attribution-ShareAlike 4.0 International License</a>`)
  })
})