import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import MoreButton from "../components/Button/MoreButton"
import Metadata from "../components/Metadata/Page/Metadata"
import PostListing from "../components/PostListing/PostListing"
import config from "../../data/SiteConfig"

class BlogPage extends Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout>
        <div className="blog-container">
          <Metadata
            description={`From Linux to Datomic to Clojure to Git, and more.
            These are some of the things I write about. Take a look around,
            let me know what you think. ${config.siteDescription}`}
            slug="/blog" />
          <PostListing postEdges={postEdges} />
          <MoreButton to="/archives" />
        </div>
      </Layout>
    )
  }
}

export default BlogPage

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPageQuery {
    allMarkdownRemark(
      limit: 2000
      skip: 15
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`
