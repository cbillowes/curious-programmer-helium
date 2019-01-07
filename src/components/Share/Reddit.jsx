import React, { Component } from "react"
import {
  RedditShareButton,
  RedditShareCount,
  RedditIcon
} from "react-share"

class SocialLinks extends Component {
  render() {
    const { url, title, size } = this.props
    const filter = (count) => (count > 0 ? count : "")
    const renderShareCount = (count) => (
      <div className="share-count">{filter(count)}</div>
    )

    return (
      <RedditShareButton url={url} title={title}>
        <RedditIcon round size={size} />
        <RedditShareCount url={url}>
          {count => renderShareCount(count)}
        </RedditShareCount>
      </RedditShareButton>
    )
  }
}

export default SocialLinks
