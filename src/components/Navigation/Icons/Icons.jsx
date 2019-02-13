import React, { Component } from "react"
import Menu from "./Menu"
import Search from "./Search"
import "./Icons.scss"

class Icons extends Component {
  render() {
    const { onMenuClick, onSearchClick } = this.props

    return (
      <div className="icons">
        <Search
          active={onSearchClick.active}
          toggle={onSearchClick.toggle.bind(this)}
        />
        <Menu
          active={onMenuClick.active}
          toggle={onMenuClick.toggle.bind(this)}
        />
      </div>
    )
  }
}

export default Icons
