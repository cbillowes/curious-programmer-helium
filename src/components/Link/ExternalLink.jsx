import React, { Component } from "react"
const _ = require("lodash")

class ExternalLink extends Component {
  render() {
    const data = this.props
    const className = data.className ? data.className : ""
    const rel = data.rel ? data.rel : ""

    return (
      <a
        key={`external-link-${_.kebabCase(data.to)}`}
        href={data.to}
        className={className}
        target="_blank"
        rel={`nofollow noopener noreferrer ${rel}`}
      >
        {data.children}
      </a>
    )
  }
}

export default ExternalLink