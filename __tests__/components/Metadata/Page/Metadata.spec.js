import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import Helmet from "react-helmet"
import Metadata from "../../../../src/components/Metadata/Page/Metadata"
import config from "../../../../data/SiteConfig"

function getMetadataTagFromHelmet(helmet, metaProperty) {
  for (let i = 0; i < helmet.metaTags.length; i++) {
    if (helmet.metaTags[i].name === metaProperty || helmet.metaTags[i].property == metaProperty) {
      return helmet.metaTags[i]
    }
  }
}

describe("a meta data component", () => {
  const data = {
    "slug": {
      "edges": [{
        "node": {
          "fields": {
            "slug": "/"
          },
        }
      }]
    }
  }
  it("should render", () => {
    const component = <Metadata data={data} />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe("an un-configured meta data component", () => {
  const slug = "/tags/technical"
  const data = {
    "slug": {
      "edges": [{
        "node": {
          "fields": {
            "slug": slug
          }
        }
      }]
    }
  }

  const component = mount(<Metadata data={data} />, {
    data: data
  })
  const helmet = Helmet.peek()
  const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML
  const canonical = helmet.linkTags[0]

  it("should generate schema types", () => {
    expect(schema.indexOf(`"@type":"WebSite"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"BreadcrumbList"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"BlogPosting"`)).toBeGreaterThan(-1)
  })

  it("should deduce the title using navigation data", () => {
    expect(helmet.title).toEqual(`Tags | ${config.siteTitle}`)
    expect(schema.indexOf(`"alternateName":"${config.siteTitleAlt}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"headline":"Tags | ${config.siteTitle}"`)).toBeGreaterThan(-1)
  })

  it("should generate the description using the site description", () => {
    const description = config.siteDescription
    expect(getMetadataTagFromHelmet(helmet, "description").content).toEqual(description)
    expect(getMetadataTagFromHelmet(helmet, "og:description").content).toEqual(description)
    expect(schema.indexOf(`"description":"${description}"`)).toBeGreaterThan(-1)
  })

  it("should generate the image pointing to the site logo", () => {
    const image = `${config.siteUrl}${config.siteLogo}`
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(image)
    expect(getMetadataTagFromHelmet(helmet, "og:image").content).toEqual(image)
    expect(schema.indexOf(`"image":"${image}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"ImageObject","url":"${image}"`)).toBeGreaterThan(-1)
  })

  it("should generate the url pointing to the site url", () => {
    const url = `${config.siteUrl}${slug}`
    expect(getMetadataTagFromHelmet(helmet, "og:url").content).toEqual(url)
    expect(schema.indexOf(`"url":"${url}"`)).toBeGreaterThan(-1)
    expect(canonical.href).toEqual(config.siteUrl)
  })

  it("should generate a website open graph type", () => {
    expect(getMetadataTagFromHelmet(helmet, "og:type").content).toEqual("website")
  })

  it("should generate twitter meta data", () => {
    expect(getMetadataTagFromHelmet(helmet, "twitter:card").content).toEqual("summary_large_image")
    expect(getMetadataTagFromHelmet(helmet, "twitter:site").content).toEqual(config.userTwitter)
    expect(getMetadataTagFromHelmet(helmet, "twitter:creator").content).toEqual(config.userTwitter)
  })
})

describe("a configured meta data component", () => {
  const title = "Hello Page"
  const description = "Just a little bit of a write up."
  const slug = "/tags/technical"
  const image = "/image.png"
  const type = "article"
  const component = mount(<Metadata
    title={title}
    description={description}
    images={{ post: image }}
    slug={slug}
    type={type} />)
  const helmet = Helmet.peek()
  const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML

  it("should generate using that title", () => {
    expect(helmet.title).toEqual(`${title} | ${config.siteTitle}`)
    expect(schema.indexOf(`"alternateName":"${config.siteTitleAlt}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"headline":"${title} | ${config.siteTitle}"`)).toBeGreaterThan(-1)
  })

  it("should generate the description using the site description", () => {
    expect(getMetadataTagFromHelmet(helmet, "description").content).toEqual(description)
    expect(getMetadataTagFromHelmet(helmet, "og:description").content).toEqual(description)
    expect(schema.indexOf(`"description":"${description}"`)).toBeGreaterThan(-1)
  })

  it("should generate the image url", () => {
    const imagePath = `${config.siteUrl}${image}`
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(imagePath)
    expect(getMetadataTagFromHelmet(helmet, "og:image").content).toEqual(imagePath)
    expect(schema.indexOf(`"image":"${imagePath}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"ImageObject","url":"${imagePath}"`)).toBeGreaterThan(-1)
  })

  it("should generate the url pointing to the site url", () => {
    const url = `${config.siteUrl}${slug}`
    expect(getMetadataTagFromHelmet(helmet, "og:url").content).toEqual(url)
    expect(schema.indexOf(`"url":"${url}"`)).toBeGreaterThan(-1)
  })

  it("should generate a website open graph type", () => {
    expect(getMetadataTagFromHelmet(helmet, "og:type").content).toEqual("website")
  })
})

describe("the images configured for a meta data component", () => {
  it("should generate the url based on the background image", () => {
    const background = "/background-photo.png"
    const component = mount(<Metadata images={{ background: background }} />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML

    const imagePath = `${config.siteUrl}${background}`
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(imagePath)
    expect(getMetadataTagFromHelmet(helmet, "og:image").content).toEqual(imagePath)
    expect(schema.indexOf(`"image":"${imagePath}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"ImageObject","url":"${imagePath}"`)).toBeGreaterThan(-1)
  })

  it("should generate the url based on the post image", () => {
    const post = "/post.png"
    const component = mount(<Metadata images={{ post: post }} />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML

    const imagePath = `${config.siteUrl}${post}`
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(imagePath)
    expect(getMetadataTagFromHelmet(helmet, "og:image").content).toEqual(imagePath)
    expect(schema.indexOf(`"image":"${imagePath}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"ImageObject","url":"${imagePath}"`)).toBeGreaterThan(-1)
  })

  it("should generate the site logo when there is an image not catered for", () => {
    const image = "/image.png"
    const component = mount(<Metadata images={{ image: image }} />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML

    const imagePath = `${config.siteUrl}${config.siteLogo}`
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(imagePath)
    expect(getMetadataTagFromHelmet(helmet, "og:image").content).toEqual(imagePath)
    expect(schema.indexOf(`"image":"${imagePath}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"ImageObject","url":"${imagePath}"`)).toBeGreaterThan(-1)
  })

  it("should return the absolute image url", () => {
    const background = "https://picsum.photo/#/64545"
    const component = mount(<Metadata images={{ background: background }} />)
    const helmet = Helmet.peek()
    const schema = helmet.scriptTags[helmet.scriptTags.length - 1].innerHTML

    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(background)
    expect(getMetadataTagFromHelmet(helmet, "og:image").content).toEqual(background)
    expect(schema.indexOf(`"image":"${background}"`)).toBeGreaterThan(-1)
    expect(schema.indexOf(`"@type":"ImageObject","url":"${background}"`)).toBeGreaterThan(-1)
  })
})

describe("the image url relative to a slug generated for a meta data component", () => {
  it("should use its relative path", () => {
    const slug = "/tags/technical"
    const background = "background-photo.png"
    const component = mount(<Metadata slug={slug} images={{ background: background }} />)
    const helmet = Helmet.peek()
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(`${config.siteUrl}${slug}/${background}`)
  })

  it("should use its relative path", () => {
    const slug = "/one/two/three/four/technical"
    const background = "../../../background-photo.png"
    const component = mount(<Metadata slug={slug} images={{ background: background }} />)
    const helmet = Helmet.peek()
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(`${config.siteUrl}/one/two/background-photo.png`)
  })

  it("should use its relative path", () => {
    const slug = "/one/two/three/four/technical"
    const background = "/background-photo.png"
    const component = mount(<Metadata slug={slug} images={{ background: background }} />)
    const helmet = Helmet.peek()
    expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(`${config.siteUrl}/background-photo.png`)
  })
})

describe("the page url generated for a meta data component", () => {
  it("should generate the site url", () => {
    const component = mount(<Metadata />)
    const helmet = Helmet.peek()
    expect(getMetadataTagFromHelmet(helmet, "og:url").content).toEqual(`${config.siteUrl}/`)
  })

  it("should generate the site url for that page", () => {
  const slug = "/tags/technical"
  const data = {
    "slug": {
      "edges": [{
        "node": {
          "fields": {
            "slug": slug
          },
        }
      }]
    }
  }
    const component = mount(<Metadata data={data} />)
    const helmet = Helmet.peek()
    expect(getMetadataTagFromHelmet(helmet, "og:url").content).toEqual(`${config.siteUrl}${slug}`)
  })
})