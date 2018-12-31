import React, { Component } from "react"
import ExternalLink from "./ExternalLink"
const _ = require("lodash")

class SocialLink extends Component {
  render() {
    const { name, icon, href } = this.props

    return (
      <span
        key={`social-link-${_.kebabCase(href)}`}
        className={icon}
        title={name}>
        <ExternalLink to={href}>{this.props.children}</ExternalLink>
      </span>
    )
  }
}

export default SocialLink