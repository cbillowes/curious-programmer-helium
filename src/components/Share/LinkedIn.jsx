import React, { Component } from "react"
import {
  LinkedinShareButton,
  LinkedinShareCount,
  LinkedinIcon
} from "react-share"

class LinkedIn extends Component {
  render() {
    const { url, title, description, size } = this.props
    const filter = (count) => (count > 0 ? count : "")
    const renderShareCount = (count) => (
      <div className="share-count">{filter(count)}</div>
    )

    return (
      <div className="social-links">
        <LinkedinShareButton
          url={url}
          title={title}
          description={description}
        >
          <LinkedinIcon round size={size} />
          <LinkedinShareCount url={url}>
            {count => renderShareCount(count)}
          </LinkedinShareCount>
        </LinkedinShareButton>
      </div>
    )
  }
}

export default LinkedIn
