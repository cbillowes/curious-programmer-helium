import React, { Component } from "react"
import License from "./License"
import Copyright from "./Copyright"
import SocialLinks from "./SocialLinks"
import "./Footer.scss"

class Footer extends Component {
  render() {
    return (
      <div className="footer-container web">
        <footer className="footer">
          <SocialLinks />
          <Copyright />
          <License />
        </footer>
      </div>
    )
  }
}

export default Footer
