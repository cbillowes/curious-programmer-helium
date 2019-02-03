import React, { Component } from "react"
import { navigate } from "gatsby"
import Metadata from "../Metadata/Post/Metadata"
import "./Elaborate.scss"

const Item = ({ post }) => (
  <aside className="post" style={{ backgroundImage: (post.cover) ? `url(${post.cover})` : "" }}>
    <div class="overlay"></div>
    <div className="container">
      <h1>{post.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      <Metadata tags={post.tags} date={post.date} timeToRead={post.timeToRead} />
    </div>
  </aside>
);

class ElaboratePostNavigation extends Component {
  render() {
    const { previous, next } = this.props

    return (
      <div className="post-navigation elaborate">
        <div className="nav previous" onClick={() => navigate(previous.slug)}>
          <Item post={previous} />
        </div>
        <div className="nav next" onClick={() => navigate(next.slug)}>
          <Item post={next} />
        </div>
      </div>
    )
  }
}

export default ElaboratePostNavigation
