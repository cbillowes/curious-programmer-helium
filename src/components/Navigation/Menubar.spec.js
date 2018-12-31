import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Menubar from "./Menubar"

describe("a menu bar component", () => {

  it("should render", () => {
    let element = <Menubar toggle={() => { }} active="true" />
    const tree = renderer.create(element).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should show the menubar when active", () => {
    const element = <Menubar toggle={() => { }} active={true} />
    const component = mount(element)
    expect(component.html()).toContain(`<nav class="menubar active">`)
  })

  it("should hide the menubar when it is not active", () => {
    const element = <Menubar toggle={() => { }} active={false} />
    const component = mount(element)
    expect(component.html()).toContain(`<nav class="menubar ">`)
  })

  it("select /blog on /", () => {
    window.history.pushState({}, "", "/")
    const element = <Menubar toggle={() => { }} active="true" />
    const component = mount(element)
    expect(component.html()).toContain(`<li class="menu-item selected"><a aria-current="page" class="" href="/">Blog</a></li>`)
  })

  it("select /blog on /blog/this-is-a-blog-post", () => {
    window.history.pushState({}, "", "/blog/this-is-a-blog-post")
    const element = <Menubar toggle={() => { }} active="true" />
    const component = mount(element)
    expect(component.html()).toContain(`<li class="menu-item selected"><a aria-current="page" class="" href="/">Blog</a></li>`)
  })

  it("select /tags on /tags/technical", () => {
    window.history.pushState({}, "", "/tags/technical")
    const element = <Menubar toggle={() => { }} active="true" />
    const component = mount(element)
    expect(component.html()).toContain(`<li class="menu-item selected"><a href="/tags">Tags</a></li>`)
  })

  it("select /privacy-policy", () => {
    window.history.pushState({}, "", "/privacy-policy")
    const element = <Menubar toggle={() => { }} active="true" />
    const component = mount(element)
    expect(component.html()).toContain(`<li class="menu-item selected"><a href="/privacy-policy">Privacy Policy</a></li>`)
  })

  it("select nothing when route does not exist", () => {
    window.history.pushState({}, "", "/tags2/technical")
    const element = <Menubar toggle={() => { }} active="true" />
    const component = mount(element)
    expect(component.html().indexOf(`<li class="menu-item selected">`)).toEqual(-1)
  })

  it("display a link to a page", () => {
    const element = <Menubar toggle={() => { }} active="true" />
    const component = mount(element)
    expect(component.html()).toContain(`<a href="/privacy-policy">Privacy Policy</a>`)
  })

  it("should toggle menubar", () => {
    let arbitraryNumber = 0
    const element = <Menubar toggle={() => arbitraryNumber =(arbitraryNumber === 0) ? 1 : 0} active="true" />
    const component = renderer.create(element)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(arbitraryNumber).toEqual(1)

    tree.props.onClick();
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(arbitraryNumber).toEqual(0)
  })
})