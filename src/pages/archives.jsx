import $ from "jquery"
import React from "react"
import { graphql } from "gatsby"
import Link from "gatsby-link"
import Layout from "../layout"
import PostMeta from "../components/Metadata/Post/Metadata"
import Metadata from "../components/Metadata/Page/Metadata"
import "./archives.scss"

class Index extends React.Component {
  onFilter = (e) => {
    const filter = $("#filter").val().toLowerCase().trim()
    const items = document.getElementsByClassName("item")
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const keywords = items[i].getAttribute("keywords").toLowerCase()
      let isVisible = keywords.indexOf(filter) > -1
      if (isVisible) {
        $(item).show()
      } else {
        $(item).hide()
      }
    }
    if ($(".item:visible").length === 0) {
      $(".empty").show()
    } else {
      $(".empty").hide()
    }
  }

  render() {
    const edges = this.props.data.allMarkdownRemark.edges
    let counter = edges.length
    return (
      <Layout>
        <div className="posts-container">
          <Metadata
            title="Archives"
            slug="/archives"
            description="From Comfort Zones to Communication to Clojure and Git. These are some of the things I write about. In this section you will get a full list of my posts dated back from 2016." />
          <div className="posts">
            <h1>Archives</h1>
            <input
              id="filter"
              className="filter"
              onKeyUp={this.onFilter}
              placeholder="Search for title" />
            <div className="empty">Nothing to see here. Try searching for a different title.</div>
            <ol>
              {edges.map((edge) => {
                const slug = edge.node.fields.slug
                const title = edge.node.frontmatter.title
                const date = edge.node.frontmatter.date
                const timeToRead = edge.node.timeToRead
                const tags = edge.node.frontmatter.tags
                const value = counter
                counter -= 1
                return (
                  <li
                    value={value}
                    className="item"
                    key={`list-${value}`}
                    keywords={title.split(" ")}>
                    <Link to={slug}>{title}</Link>
                    <PostMeta date={date} timeToRead={timeToRead} tags={tags} />
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ArchiveQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
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
