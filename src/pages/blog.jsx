import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import Metadata from "../components/Metadata/Page/Metadata"
import PostListing from "../components/PostListing/PostListing"

class BlogPage extends Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout>
        <div className="blog-container">
          <Metadata slug="/blog" />
          <PostListing postEdges={postEdges} />
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
