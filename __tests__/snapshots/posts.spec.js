import React from "react"
import renderer from "react-test-renderer"
import Template from "../../src/templates/post"
import Disqus from "../../src/components/Disqus/Disqus"
import Accordion from "../../src/components/Accordion/Accordion"
import Tags from "../../src/components/Tag/Tags"
import SocialLinks from "../../src/components/Share/Share"
import PostMetadata from "../../src/components/Metadata/Post/Metadata"
import CompactNavigation from "../../src/components/PostNavigation/Compact"
import ElaborateNavigation from "../../src/components/PostNavigation/Elaborate"
const data = require("../data/post")
const context = {
  slug: data.post.fields.slug
}

describe("post components", () => {
  it("template", () => {
    const tree = renderer.create(<Template pageContext={context} data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("disqus", () => {
    const tree = renderer.create(<Disqus postNode={data.post} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("accordion", () => {
    const tree = renderer.create(<Accordion content={data.post.html} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("tags", () => {
    const tree = renderer.create(<Tags content={data.post.frontmatter.tags} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("social links", () => {
    const tree = renderer.create(<SocialLinks postPath={context.slug} postNode={data.post} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("post metadata", () => {
    const tree = renderer.create(<PostMetadata tags={data.post.frontmatter.tags} date={new Date()} timeToRead={10} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("compact navigation", () => {
    const tree = renderer.create(<CompactNavigation previous={data.prev} next={data.next} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("elaborate navigation", () => {
    const tree = renderer.create(<ElaborateNavigation previous={data.prev} next={data.next} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})