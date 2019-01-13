import React, { Component } from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby";
import config from "../../../../data/SiteConfig"
import navigation from "../../../../data/Navigation"
import Path from "path"
import url from "url-join"

class Metadata extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: (this.props.slug) ? this.props.slug : this.getSlug(props)
    }
  }

  getSlug = (props) => {
    if (props.data.slug) {
      return edges[0].node.fields.slug
    }
    return "/"
  }

  getTitle = (title) => {
    if (title && title !== config.siteTitle) {
      return `${title} | ${config.siteTitle}`
    }

    if (!title) {
      const navigationItem = getNavigationItem(this.state.slug)
      return `${navigationItem.name} | ${config.siteTitle}`
    }

    return config.siteTitle
  }

  getDescription = (description) => {
    if (description) {
      return description
    }
    return config.siteDescription
  }

  getImageUrl = (images, slug) => {
    if (images) {
      let image
      if (images.ogImage) {
        image = images.ogImage
      } else if (images.cover) {
        image = images.cover
      } else if (config.defaultOgImage) {
        image = config.defaultOgImage
      } else {
        image = config.siteLogo
      }

      if (image.startsWith("http")) {
        return image
      }
      if (image.startsWith("/")) {
        return config.siteUrl + Path.resolve(slug, image)
      }
      return config.siteUrl + Path.resolve(slug, image)
    }
    return config.siteUrl + Path.resolve(slug, config.siteLogo)
  }

  getUrl = (slug) => {
    if (slug) {
      return url(config.siteUrl, slug)
    }
    let navigationItem = getNavigationItem(this.state.slug)
    let pageUrl = url(config.siteUrl, navigationItem.url)
    return pageUrl
  }

  getType = (slug) => {
    if (slug && slug.indexOf("/blog/")) {
      return "article"
    }
    return "website"
  }

  render() {
    const { title, description, images, slug } = this.props
    const pageTitle = this.getTitle(title)
    const pageDescription = this.getDescription(description)
    const imageUrl = this.getImageUrl(images, slug)
    const pageUrl = this.getUrl(slug)
    const pageType = this.getType(slug)

    return (
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="canonical" href={pageUrl} />
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={pageDescription} />
        <meta name="image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={config.userTwitter} />
        <meta name="twitter:creator" content={config.userTwitter} />

        <meta property="fb:app_id" content={config.siteFBAppID} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content={pageType} />

        <script type="application/ld+json">
          {getSchema(pageTitle, pageDescription, pageUrl, imageUrl)}
        </script>
      </Helmet>
    );
  }
}

function getNavigationItem(slug) {
  let navigationItem = navigation[0]
  navigation.map((item) => {
    if (slug.indexOf(item.url) > -1) {
      navigationItem = item
    }
    return navigationItem
  })
  return navigationItem
}

function getSchema(title, description, url, image) {
  const schema = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: url,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt
    },
    {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": url,
            name: title,
            image: image
          }
        }
      ]
    },
    {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: url,
      name: title,
      alternateName: config.siteTitleAlt,
      headline: title,
      image: {
        "@type": "ImageObject",
        url: image
      },
      description: description
    }
  ]
  return JSON.stringify(schema)
}

export default Metadata

export const pageQuery = graphql`
  query MetadataComponent($slug: String!) {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      fields {
        slug
      }
    }
  }
`