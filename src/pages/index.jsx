import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import MoreButton from "../components/Button/MoreButton"
import PostListing from "../components/PostListing/PostListing"
import Metadata from "../components/Metadata/Page/Metadata"
import config from "../../data/SiteConfig"

class Index extends React.Component {
  render() {
    const description = `From Git and Linux to Clojure and Comfort Zone's, these are
    some of the things I write about. ${config.siteDescription}`
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <div className="index-container">
          <Metadata
            description={`From Linux to Datomic to Clojure to Git, and more.
            These are some of the things I write about. Take a look around,
            let me know what you think. ${config.siteDescription}`}
            slug="/" />
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
