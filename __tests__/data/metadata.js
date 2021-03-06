import config from "../../data/SiteConfig"
import url from "url-join"
import Path from "path"

function getMetadataTagFromHelmet(helmet, property) {
  for (let i = 0; i < helmet.metaTags.length; i++) {
    if (helmet.metaTags[i].name === property || helmet.metaTags[i].property == property) {
      return helmet.metaTags[i]
    }
  }
}

function expectSchemaTypes(schema) {
  expect(schema.indexOf(`"@type":"WebSite"`)).toBeGreaterThan(-1)
  expect(schema.indexOf(`"@type":"BreadcrumbList"`)).toBeGreaterThan(-1)
  expect(schema.indexOf(`"@type":"BlogPosting"`)).toBeGreaterThan(-1)
}

function expectTitle(title, helmet, schema) {
  expect(helmet.title).toEqual(`${title} | ${config.siteTitle}`)
  expect(schema.indexOf(`"alternateName":"${config.siteTitleAlt}"`)).toBeGreaterThan(-1)
  expect(schema.indexOf(`"headline":"${title} | ${config.siteTitle}"`)).toBeGreaterThan(-1)
}

function expectDescription(description, helmet, schema) {
  expect(getMetadataTagFromHelmet(helmet, "description").content).toEqual(description)
  expect(getMetadataTagFromHelmet(helmet, "og:description").content).toEqual(description)
  expect(schema.indexOf(`"description":"${description}"`)).toBeGreaterThan(-1)
}

function expectImage(image, helmet, schema) {
  expect(getMetadataTagFromHelmet(helmet, "image").content).toEqual(image)
  expect(getMetadataTagFromHelmet(helmet, "og:image").content).toEqual(image)
  expect(schema.indexOf(`"image":"${image}"`)).toBeGreaterThan(-1)
  expect(schema.indexOf(`"@type":"ImageObject","url":"${image}"`)).toBeGreaterThan(-1)
}

module.exports = {
  expect: function (expected, helmet, schema) {
    it("schema types", () => {
      expectSchemaTypes(schema)
    })

    it("canonical and urls", () => {
      const absoluteUrl = url(config.siteUrl, expected.slug)
      const canonical = helmet.linkTags[0]
      expect(getMetadataTagFromHelmet(helmet, "og:url").content).toEqual(absoluteUrl)
      expect(schema.indexOf(`"url":"${absoluteUrl}"`)).toBeGreaterThan(-1)
      expect(canonical.href).toEqual(absoluteUrl)
    })

    it("title", () => {
      expectTitle(expected.title, helmet, schema)
    })

    it("description", () => {
      expectDescription(expected.description, helmet, schema)
    })

    it("open graph type", () => {
      expect(getMetadataTagFromHelmet(helmet, "og:type").content).toEqual("article")
    })

    it("twitter metadata", () => {
      expect(getMetadataTagFromHelmet(helmet, "twitter:card").content).toEqual("summary_large_image")
      expect(getMetadataTagFromHelmet(helmet, "twitter:site").content).toEqual(config.userTwitter)
      expect(getMetadataTagFromHelmet(helmet, "twitter:creator").content).toEqual(config.userTwitter)
    })

    it("image", () => {
      expectImage(expected.image, helmet, schema)
    })
  },

  expectImage: function (image, helmet, schema) {
    expectImage(image, helmet, schema)
  }
}