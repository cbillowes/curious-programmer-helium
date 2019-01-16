import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import Disqus from "../components/Disqus/Disqus"
import Accordion from "../components/Accordion/Accordion"
import Tags from "../components/Tag/Tags"
import SocialLinks from "../components/Share/Share"
import PageMetadata from "../components/Metadata/Page/Metadata"
import PostMetadata from "../components/Metadata/Post/Metadata"
import CompactNavigation from "../components/PostNavigation/Compact"
import ElaborateNavigation from "../components/PostNavigation/Elaborate"
import "./post.scss"
const $ = require("jquery")

function blurCoverOnScroll() {
  if (typeof window !== "undefined" && window.scroll) {
    const background = $(".cover.default.background")
    if (background.length === 1) {
      let opacity = 1
      let y = window.scrollY
      window.onscroll = function () {
        if (window.scrollY >= $(window).height()) {
          opacity = 0
        } else {
          opacity = 1
        }
        background
          .css({
            "opacity": opacity,
            "filter": `alpha(opacity=${opacity * 10})`,
            "transition": "opacity 1s ease-in-out"
          })
        y = window.scrollY
      }
    }
  }
}

function enableGifPlayback() {
  $(".gif").each(function () {
    const gif = $(this)
    gif.css({ "position": "relative" })
    const spinner = $(`<div class="loading spinner-border" role="status"><span class="sr-only">Loading...</span></div>`)
    spinner
      .css({
        "position": "absolute",
        "top": "1em",
        "left": "1em"
      })
    gif.prepend(spinner)

    const title = gif.attr("alt")
    const still = gif.find(".still")
    still
      .attr("alt", title)
      .css({ "cursor": "pointer" })
      .click(function () {
        gif.find(".loading").hide()
        gif.find(".still").hide()
        gif.find(".animated").show()
      })

    const animated = gif.find(".animated")
    animated
      .attr("alt", title)
      .css({ "cursor": "pointer" })
      .hide()
      .click(function () {
        if (gif.hasClass("loading")) return

        gif.find(".loading").hide()
        gif.find(".animated").hide()
        gif.find(".still").show()
      })
      .on("load", function () {
        gif.find(".loading").hide()
      })

    const enlarge = $(this).find("a")
    enlarge
      .html("<i>Enlarge this gif in a new window</i>")
      .attr("target", "_blank")
      .attr("nofollow")
  })
}

export default class PostTemplate extends React.Component {
  componentDidMount() {
    blurCoverOnScroll()
    enableGifPlayback()
  }

  getPostItem = (node) => {
    return {
      title: node.frontmatter.title,
      slug: node.fields.slug,
      excerpt: node.excerpt,
      timeToRead: node.timeToRead,
      cover: node.frontmatter.cover,
      date: node.fields.date,
      tags: node.frontmatter.tags
    }
  }

  render() {
    const { slug, next, prev } = this.props.pageContext
    const postNode = this.props.data.post
    const previousPost = this.getPostItem(this.props.data.prev)
    const nextPost = this.getPostItem(this.props.data.next)
    const post = postNode.frontmatter
    const blur = post.blur ? post.blur : `${post.cover}&blur`

    return (
      <Layout>
        <PageMetadata
          title={post.title}
          description={postNode.excerpt}
          slug={slug}
          images={{ cover: post.cover, ogImage: post.ogImage }} />
        {post.cover && blur ?
          <span className="cover blur background" style={{ backgroundImage: `url(${blur})` }}></span> :
          <span></span>}
        {post.cover ?
          <span className="cover default background" style={{ backgroundImage: `url(${post.cover})` }}></span> :
          <span></span>}
        <div className={`post ${post.cover ? "with-cover" : ""}`}>
          <div class="compact-navigation">
            <CompactNavigation previous={previousPost} next={nextPost} />
          </div>
          <div class="wild-container">
            <h1>{post.title}</h1>
          </div>
          <div class="container body">
            <PostMetadata tags={post.tags} date={postNode.fields.date} timeToRead={postNode.timeToRead} />
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <Accordion content={postNode.html} />
            <div className="post-footer">
              <hr />
              <Tags tags={post.tags} />
              <SocialLinks postPath={slug} postNode={postNode} />
            </div>
            <Disqus postNode={postNode} />
          </div>
        </div>
        <ElaborateNavigation previous={previousPost} next={nextPost} />
      </Layout>
    )
  }
}

/* eslint no-undef: "off"*/
export const postQuery = graphql`
  query BlogPostBySlug($slug: String!, $next: String, $prev: String) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      frontmatter {
        title
        cover
        ogImage
        blur
        tags
      }
      fields {
        slug
        date
      }
    }

    prev: markdownRemark(fields: { slug: { eq: $prev } }) {
      excerpt(pruneLength: 200)
      timeToRead
      frontmatter {
        title
        cover
        tags
      }
      fields {
        slug
        date
      }
    }

    next: markdownRemark(fields: { slug: { eq: $next } }) {
      excerpt(pruneLength: 200)
      timeToRead
      frontmatter {
        title
        cover
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`