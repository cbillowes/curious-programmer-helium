import React, { Component } from "react"
import Button from "./Button"
import "./MoreButton.scss"

class MoreButton extends Component {
  render() {
    return (
      <div className="more">
        <Button to={this.props.to}>see more</Button>
      </div>
    )
  }
}

export default MoreButton