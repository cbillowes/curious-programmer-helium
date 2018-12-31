import React, { Component } from "react"
import {
  TwitterShareButton,
  TwitterIcon
} from "react-share"

class Twitter extends Component {
  render() {
    const { url, title, size } = this.props

    return (
      <div className="social-links">
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon round size={parseInt(size)} />
        </TwitterShareButton>
      </div>
    )
  }
}

export default Twitter
