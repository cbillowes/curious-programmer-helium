import React, { Component } from "react"
import {
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon
} from "react-share"

class Facebook extends Component {
  render() {
    const { url, title, description, size } = this.props
    const filter = count => (count > 0 ? count : "")
    const renderShareCount = count => (
      <div className="share-count">{filter(count)}</div>
    )

    return (
      <FacebookShareButton url={url} quote={`${title} | ${description}`}>
        <FacebookIcon round size={size} />
        <FacebookShareCount url={url}>
          {count => renderShareCount(count)}
        </FacebookShareCount>
      </FacebookShareButton>
    )
  }
}

export default Facebook
