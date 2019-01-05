import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import Metadata from "../components/Metadata/Page/Metadata"
import PostListing from "../components/PostListing/PostListing"

export default class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext
    const postEdges = this.props.data.allMarkdownRemark.edges
    const title = `${tag.substring(0, 1).toUpperCase() + tag.substring(1, tag.length)} | Tags`

    return (
      <Layout>
        <Metadata title={title} slug={`/tags/${tag}`} />
        <div className="tag-container">
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
            cover
            date
          }
        }
      }
    }
  }
`
