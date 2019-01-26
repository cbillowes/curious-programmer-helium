import React, { Component } from "react"
import Link from "gatsby-link"
import "./Compact.scss"

class CompactPostNavigation extends Component {
  render() {
    const { previous, next } = this.props

    return (
      <div className="post-navigation compact">
        <Link className="previous" to={previous.slug}><span className="title">{previous.title}</span></Link>
        <Link className="next" to={next.slug}><span className="title">{next.title}</span></Link>
      </div>
    )
  }
}

export default CompactPostNavigation
