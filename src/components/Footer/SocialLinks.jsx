import React, { Component } from "react"
import ExternalLink from "../Link/ExternalLink"
import data from "../../../data/SocialLinks"
import "./SocialLinks.scss"

class License extends Component {
  render() {
    const links = data.footer

    return (
      <ul className="social-links-footer">
        {links.map(item => {
          return (
            <li key={`social-links-footer-${item.icon}`} className="link">
              <ExternalLink
                to={item.href}
                className={item.icon} />
            </li>)
        })}
      </ul>
    )
  }
}

export default License
