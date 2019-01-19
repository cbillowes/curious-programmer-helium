import React from "react"
import { graphql } from "gatsby"
import Link from "gatsby-link"
import Layout from "../layout"
import MoreButton from "../components/Button/MoreButton"
import PostListing from "../components/PostListing/PostListing"
import Metadata from "../components/Metadata/Page/Metadata"

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <div className="index-container">
          <Metadata slug="/" />
          <PostListing postEdges={postEdges} />
          <MoreButton to="/archives" />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 15
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt(pruneLength: 250)
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
`;
