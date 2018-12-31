import React, { Component } from "react"
import Link from "gatsby-link"
import "./Compact.scss"

class CompactPostNavigation extends Component {
  render() {
    const { previous, next } = this.props

    return (
      <div className="post-navigation compact">
        <Link className="previous" to={previous.slug}>{previous.title}</Link>
        <Link className="next" to={next.slug}>{next.title}</Link>
      </div>
    )
  }
}

export default CompactPostNavigation
