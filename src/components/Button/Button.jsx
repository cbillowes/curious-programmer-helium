import React, { Component } from "react"
import Link from "gatsby-link"
import "./Button.scss"

class Button extends Component {
  render() {
    return (
      <Link to={this.props.to} className="button">{this.props.children}</Link>
    )
  }
}

export default Button