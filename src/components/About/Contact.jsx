import React, { Component } from "react"
import Link from "gatsby-link"
import socialLinks from "../../../data/SocialLinks"
import "./Contact.scss"

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        {socialLinks.contact.map(item => {
          return (
            <Link
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
