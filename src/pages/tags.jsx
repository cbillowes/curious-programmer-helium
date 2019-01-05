import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import Metadata from "../components/Metadata/Page/Metadata"
import Tags from "../components/Tag/Tags"
const _ = require("lodash")
import "./tags.scss"

class TagsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: this.getTags()
    }
  }

  getTags = () => {
    let data = this.props.data.allMarkdownRemark.edges
      .map(item => item.node.frontmatter)
      .map(item => item.tags)
    let tagCollection = data.map(item => (!item ? [] : item))
    let tags = []
    for (let i = 0; i < tagCollection.length; i++) {
      for (let j = 0; j < tagCollection[i].length; j++) {
        let tag = tagCollection[i][j]
        if (!_.includes(tags, tag)) tags.push(tag)
      }
    }
    return tags.sort()
  }

  render() {
    return (
      <Layout>
        <div className="tags-container container">
          <Metadata slug="/tags" />
          <h1>Tags</h1>
          <Tags tags={this.state.tags} />
        </div>
      </Layout>
    )
  }
}

export default TagsPage

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query TagsPage {
    allMarkdownRemark(limit: 1000) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            tags
          }
        }
      }
    }
  }
`