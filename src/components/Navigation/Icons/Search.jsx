import React, { Component } from "react"
import "./Search.scss"

class Search extends Component {
  render() {
    return (
      <div
        className={`icon search ${this.props.active ? "active" : ""}`}
        onClick={this.props.toggle.bind(this)}
      >
        <i />
      </div>
    )
  }
}

export default Search