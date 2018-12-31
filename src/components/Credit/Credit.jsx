import React, { Component } from "react"
import External from "../Link/ExternalLink"
const _ = require("lodash")

class Credit extends Component {
  render() {
    const { to, title } = this.props
    return (
      <div className="credit" key={`credit-${_.kebabCase(title)}`}>
        <span>{this.props.children}</span>
        <External to={to}>{title}</External>
      </div>
    )
  }
}

  export default Credit
