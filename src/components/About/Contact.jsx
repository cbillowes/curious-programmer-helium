import React, { Component } from "react"
import ExternalLink from "../Link/ExternalLink"
import socialLinks from "../../../data/SocialLinks"
import "./Contact.scss"

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        {socialLinks.contact.map((item) => {
          return (
            <ExternalLink
              key={`contact-${item.icon}`}
              className={`icon ${item.icon}`}
              to={item.href} />
          )
        })}
      </div>
    )
  }
}

export default Contact
