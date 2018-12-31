import React, { Component } from "react"
import Link from "gatsby-link"
const _ = require("lodash")

class Tag extends Component {
  render() {
    const { to } = this.props

    if (to) {
      return (
        <Link key={`tag-${_.uniqueId()}-${to}`} className="tag" to={to}>
          {this.props.children}
        </Link>
      )
    } else {
      return (
        <span key={`tag-${_.uniqueId()}-${_.random(9999)}`} className="tag">{this.props.children}</span>
      )
    }
  }
}

export default Tag