import React, { Component } from "react"
import Link from "gatsby-link"
import config from "../../../../data/SiteConfig"
import "./Logo.scss"

class Logo extends Component {
  render() {
    const title = config.siteTitle.toLowerCase()
    const splitTitle = title.split(" ")
    const left = splitTitle[0]
    const right = splitTitle[1]

    return (
      <div className="logo" onClick={this.props.onLogoClick.bind(this)}>
        <div className="default-logo">
          <Link to="/">
            &#123; <span className="normal-weight">{left}</span> {right} &#125;
          </Link>
        </div>
        <div className="mobile-logo">
          <Link to="/">
            &#123; &#125;
          </Link>
        </div>
      </div>
    )
  }
}

export default Logo