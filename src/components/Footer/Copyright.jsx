import React, { Component } from "react"
import Link from "gatsby-link"
import config from "../../../data/SiteConfig"
import "./Copyright.scss"

class License extends Component {
  render() {
    return (
      <div className="copyright-footer">
        Copyright &copy; { "" } 
        {new Date().getFullYear()} { "" }
        {config.siteTitle}. { "" }
        Made with Gatsby v2 and other { "" }
        <Link to="/credits">cool stuff</Link>.
      </div>
    )
  }
}

export default License
