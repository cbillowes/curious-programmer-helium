import React from "react"
import Metadata from "../Metadata/Post/Metadata"
import "./PostListing.scss"

class PostListing extends React.Component {
  getPostList() {
    const postList = []
    this.props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      })
    })
    return postList
  }
  render() {
    const list = this.getPostList()
    return (
      <div className="posts">
        {list.map((post) => {
          return (
            <section key={`post-${post.path}`}>
              <a href={post.path}>
                <h1>{post.title}</h1>
              </a>
              <p>{post.excerpt}</p>
              <Metadata tags={post.tags} date={post.date} timeToRead={post.timeToRead} />
              <hr />
            </section>
          )
        })}
      </div>
    )
  }
}

export default PostListing
