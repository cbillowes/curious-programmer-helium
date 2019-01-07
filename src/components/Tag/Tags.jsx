import React, { Component } from "react"
import Tag from "./Tag"
const _ = require("lodash")
import "./Tags.scss"

class Tags extends Component {
  render() {
    const tags = this.props.tags ? this.props.tags : []

    return (
      <ul className="tags">
        {tags.map((tag) => {
          return <li key={`tags-${_.kebabCase(tag)}`}>
            <Tag to={`/tags/${_.kebabCase(tag)}`}>{tag}</Tag>
          </li>
        })}
      </ul>
    )
  }
}

export default Tags