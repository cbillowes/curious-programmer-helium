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
            description={`${config.siteDescription} Read posts about Linux or Datomic or Clojure or Git and much more.`}
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
