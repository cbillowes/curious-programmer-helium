import React, { Component } from "react"
import {
  GooglePlusShareButton,
  GooglePlusShareCount,
  GooglePlusIcon
} from "react-share"

class GooglePlus extends Component {
  render() {
    const { url, size } = this.props
    const filter = count => (count > 0 ? count : "")
    const renderShareCount = count => (
      <div className="share-count">{filter(count)}</div>
    )

    return (
      <GooglePlusShareButton url={url}>
        <GooglePlusIcon round size={size} />
        <GooglePlusShareCount url={url}>
          {count => renderShareCount(count)}
        </GooglePlusShareCount>
      </GooglePlusShareButton>
    )
  }
}

export default GooglePlus
