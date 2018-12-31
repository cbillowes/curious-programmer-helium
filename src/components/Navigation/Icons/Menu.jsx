import React, { Component } from "react"
import "./Menu.css"

class Menu extends Component {
  render() {
    return (
      <div
        className={`icon menu ${this.props.active ? "active" : ""}`}
        onClick={this.props.toggle.bind(this)}
      >
        <i />
      </div>
    )
  }
}

export default Menu