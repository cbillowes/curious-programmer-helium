import React, { Component } from "react"
import Link from "gatsby-link"
import navigation from "../../../data/Navigation"
import "./Menubar.scss"

class Menubar extends Component {
  constructor(props) {
    super(props)
  }

  getRootUrl = () => {
    if (typeof window !== "undefined" && window.location) {
      let url = window.location.pathname
      if (url !== "/") {
        let paths = url.split("/")
        if (paths[1] === "blog") {
          return "/"
        } else {
          return `/${paths[1]}`
        }
      }
      return url
    }
  }

  isSelected = (url) => {
    return this.getRootUrl() === url ? "selected" : ""
  }

  render() {
    return (
      <nav
        className={`menubar ${this.props.active ? "active" : ""}`}
        onClick={this.props.toggle.bind(this)}
      >
        <ul>
          {navigation.map((item) => {
            return (
              <li
                key={`menubar-${item.url}`}
                className={`menu-item ${this.isSelected(item.url)}`}
              >
                <Link to={item.url}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}

export default Menubar